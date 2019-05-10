import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Fib from './Fib'
import OtherPage from './OtherPage'

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Link to='/' style={{color: 'white'}}>Home</Link>
          <Link to='/otherpage' style={{color: 'white'}}>Other Page</Link>

          <div>
            <Route exact path='/' component={Fib} />
            <Route path='/otherpage' component={OtherPage} />
          </div>
        </header>
      </div>
    </Router>
  )
}

export default App
