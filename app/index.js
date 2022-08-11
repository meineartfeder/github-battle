import React from 'react'
import { createRoot } from 'react-dom/client';
import './index.scss'
import { ThemeProvider } from './contexts/theme'
import Nav from './components/Nav'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Loading from './components/Loading';

const Popular = React.lazy(() => import('./components/Popular'))
const Battle = React.lazy(() => import('./components/Battle'))
const Results = React.lazy(() => import('./components/Results'))
const Todos = React.lazy(() => import('./components/Todos'))
const HackerNewsTopArticles = React.lazy(() => import('./components/hackernews/TopArticles'))
const HackerNewsNewArticles = React.lazy(() => import('./components/hackernews/NewArticles'))
const HackerNewsUser = React.lazy(() => import('./components/hackernews/User'))
const HackerNewsPost = React.lazy(() => import('./components/hackernews/Post'))

const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript

// Component
// State
// Lifecycle (fetching data from API, Events)
// UI

class App extends React.Component {
  state = {
    theme: 'light',
    toggleTheme: () => {
      this.setState(({ theme }) => ({
        theme: theme === 'light' ? 'dark' : 'light'
      }))
    }
  }
  render() {
    return (
      <Router>
        <ThemeProvider value={this.state}>
          <div className={this.state.theme}>
            <div className='container'>
              <Nav />

              <React.Suspense fallback={<Loading />}>
                <Switch>  
                  <Route exact path='/' component={Popular} />
                  <Route exact path='/battle' component={Battle} />
                  <Route path='/battle/results' component={Results} />
                  <Route path='/todos' component={Todos} />
                  <Route exact path='/hackernews' component={HackerNewsTopArticles} />
                  <Route path='/hackernews/new' component={HackerNewsNewArticles} />
                  <Route path='/hackernews/user' component={HackerNewsUser} />
                  <Route path='/hackernews/post' component={HackerNewsPost} />
                  <Route component={() => <h1>404 - Page not found!</h1>} />
                </Switch>
              </React.Suspense>
            </div>
          </div>
        </ThemeProvider>
      </Router>
    )
  }
}

root.render(<App />);