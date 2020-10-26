import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/index'
import Home from './pages/Home/Home'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Switch>
            <Route path='/' component={Home} />
          </Switch>
        </Router>
      </div>
    </Provider>

  )
}

export default App;
