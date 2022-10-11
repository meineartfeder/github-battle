import React from "react";
import { fetchRandomJoke } from "../utils/api.dad-jokes"
import Loading from "./Loading";
import ThemeContext from "../contexts/theme";
import queryString from "query-string";

function JokeSection({ joke }: { joke: string }) {
  return (
    <div className="center-text">
      <p style={{fontSize: '50px', fontStyle: 'italic'}}>"{joke}"</p>
    </div>
  )
}

type JokeAction = {
  type: "success",
  joke: string,
} | {
  type: "loading",
  loading: boolean
} | {
  type: "error",
  error: string
}

interface JokeState {
  joke: null | string;
  error: null | string;
  loading: boolean
}

function jokesReducer(state: JokeState, action: JokeAction): JokeState {
  if (action.type === 'success') {
    return {
      joke: action.joke,
      error: null,
      loading: false
    }
  } else if (action.type === 'loading') {
    return {
      joke: null,
      error: null,
      loading: true
    }
  } else if (action.type === 'error') {
    return {
      ...state,
      error: action.error,
      loading: false
    }
  } else {
    throw new Error(`That action type isn't supported.`)
  }
}

export default function Jokes () {
  const theme = React.useContext(ThemeContext)
  const [ state, dispatch ] = React.useReducer(jokesReducer, {
    joke: null,
    error: null,
    loading: true,
  })

  const getRandomJoke = () => {
    dispatch({ type: 'loading', loading: true });

    fetchRandomJoke("https://icanhazdadjoke.com/")
      .then((joke) => dispatch({ type: 'success', joke: joke.joke }))
      .catch((error) => dispatch({ type: 'error', error: error }))
  }

  React.useEffect(() => {
    getRandomJoke();
  }, []);

  const { joke, error, loading } = state
  const { name } = queryString.parse(location.search)

  if (error) {
    return <p className='center-text error'>{error}</p>
  }

  return (
    <React.Fragment>
      {name
        ? <h1>One Dad Joke for {name}!</h1>
        : <h1>One Dad Joke for you!</h1>}
      
      {loading || !joke
        ? <Loading text="Loading Joke" />
        : <React.Fragment>
            <JokeSection joke={joke} />
            <button 
              onClick={() => getRandomJoke()}
              className={`btn ${theme === 'dark' ? 'light-btn' : 'dark-btn'} btn-space`}
              >
                New Joke
            </button>
          </React.Fragment>
        }
    </React.Fragment>
  )
}