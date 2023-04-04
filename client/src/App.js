import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {useContext, useState} from "react";
import {Context} from "./index";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";

const App = () => {
  return (
      <BrowserRouter>
          <NavBar/>
          <AppRouter/>
      </BrowserRouter>
  );
};

export default App;

