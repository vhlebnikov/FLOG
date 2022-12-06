import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './components/App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import Login from './pages/login'
import SignUp from './pages/SignUp'
import CreateAdd from './pages/CreateAdd'
import Adds from './pages/Adds'
import Forgot from "./pages/Forgot";


function App() {
  return (
      <Router>
        <div className="App">
          <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
            <div className="container">
              <Link className="navbar-brand" to={'/adds'}>
                FLOG
              </Link>
              <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav ml-auto">

                  <li className="nav-item">
                    <Link className="nav-link" to={'/sign-in'}>
                      Login
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to={'/sign-up'}>
                      Sign up
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to={'/create-add'}>
                      Create an add
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to={'/adds'}>
                      All ads
                    </Link>
                  </li>

                </ul>
              </div>
            </div>
          </nav>

          <div className="auth-wrapper">
            <div className="auth-inner">
              <Routes>
                <Route exact path="/" element={<Login />} />
                <Route path="/sign-in" element={<Login />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/create-add" element={<CreateAdd />} />
                <Route path="/adds" element={<Adds />} />
                <Route path="/forgot" element={<Forgot />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
  )
}

export default App