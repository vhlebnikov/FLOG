import React, { Component } from 'react'
import '../components/App.css'
import {Link, Route, Routes} from "react-router-dom";
import Login from "./login";
import SignUp from "./SignUp";
import CreateAdd from "./CreateAdd";
import Adds from "./Adds";
import MyInput from "../components/UI/input/MyInput";

function Forgot (){

        return(
            <div>
                <div>
                    <br/>
                    <br/>
                    <br/>
                    <h>If you forgot your password,</h> <br/>
                    <h>please, check your email and enter the code from our letter</h>
                </div>
                <div className="mb-3">
                    <br/>
                    <label>Code from email</label>
                    <MyInput
                        type="code"
                        className="form-control"
                        placeholder="Enter a code"
                    />
                </div>

            </div>

        )
}

export default Forgot