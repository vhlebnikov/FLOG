import React, { Component } from 'react'
import MyButton from "../components/UI/button/MyButton";
import MyInput from "../components/UI/input/MyInput";

export default class SignUp extends Component {
    render() {
        return (
            <form>
                <br/>
                <br/>
                <br/>
                <h3 >Sign Up</h3>

                <div className="mb-3">
                    <label>First name</label>
                    <MyInput
                        type="text"
                        className="form-control"
                        placeholder="First name"
                    />
                </div>

                <div className="mb-3">
                    <label>Last name</label>
                    <MyInput type="text" className="form-control" placeholder="Last name" />
                </div>

                <div className="mb-3">
                    <label>Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
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

                <div className="d-grid">
                    <MyButton type="submit" className="btn btn-primary">
                        Sign Up
                    </MyButton>
                </div>
                <p className="forgot-password text-right">
                    Already registered <a href="/sign-in">sign in?</a>
                </p>
            </form>
        )
    }
}