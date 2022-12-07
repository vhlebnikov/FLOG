import React from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './styles/App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from "../src/pages/Login";
import SignUp from "../src/pages/SignUp";
import Adds from "../src/pages/Adds";


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
                            <Route path="/adds" element={<Adds />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
