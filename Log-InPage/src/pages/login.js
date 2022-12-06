import React, { Component } from 'react'
import {Link, Route, Routes} from "react-router-dom";
import MyButton from "../components/UI/button/MyButton";
import MyInput from "../components/UI/input/MyInput";
import SignUp from "./SignUp";
import CreateAdd from "./CreateAdd";
import Adds from "./Adds";
import Forgot from "./Forgot";

export default class Login extends Component {
    render() {
        return (
            <form>
                <br/>
                <br/>
                <br/>
                <h3>Sign In</h3>

                <div className="mb-3">
                    <label>Email address</label>
                    <MyInput
                        type="email"
                        className="form-control"
                        placeholder="Enter email @g.nsu.ru"
                    />
                </div>

                <div className="mb-3">
                    <label>Password</label>
                    <MyInput
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                    />
                </div>

                <div className="mb-3">
                    <div className="custom-control custom-checkbox">
                        <MyInput
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck1"
                        />
                        <label className="custom-control-label" htmlFor="customCheck1">
                            Remember me
                        </label>
                    </div>
                </div>

                <div className="d-grid">
                    <MyButton type="submit" className="btn btn-primary">
                        Submit
                    </MyButton>
                </div>
                <li className="nav-item">
                    <Link className="nav-link" to={'/forgot'}>
                        Forgot <a href="#"> password? </a>
                    </Link>
                </li>
                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <Routes>
                            <Route path="/forgot" element={<Forgot/>} />
                        </Routes>
                    </div>
                </div>
            </form>
        )
    }
}