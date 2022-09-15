import React from "react";
import { fetchRandomJoke } from "../utils/api.dad-jokes"
import Loading from "./Loading";
import ThemeContext from "../contexts/theme";
import queryString from "query-string";

function Joke ({ joke }) {
  return (
    <div className="center-text">
      <p style={{fontSize: '50px', fontStyle: 'italic'}}>"{joke}"</p>
    </div>
  )
}

function jokesReducer (state, action) {
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
      error: action.message,
      loading: false
    }
  } else {
    throw new Error(`That action type isn't supported.`)
  }
}

export default function Jokes () {
  const theme = React.useContext(ThemeContext)
  const [ newJoke, setNewJoke ] = React.useState(0);
  const [ state, dispatch ] = React.useReducer(jokesReducer, {
    joke: null,
    error: null,
    loading: true,
  })

  React.useEffect(() => {
    dispatch({ type: 'loading' });

    fetchRandomJoke()
      .then((joke) => dispatch({ type: 'success', joke: joke.joke }))
      .catch((message) => dispatch({ type: 'error', error: message }))
  }, [newJoke]);

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
      
      {loading
        ? <Loading text="Loading Joke" />
        : <React.Fragment>
            <Joke joke={joke} />
            <button 
              onClick={() => setNewJoke(newJoke + 1)}
              className={`btn ${theme === 'dark' ? 'light-btn' : 'dark-btn'} btn-space`}
              >
                New Joke
            </button>
          </React.Fragment>
        }
    </React.Fragment>
  )
}