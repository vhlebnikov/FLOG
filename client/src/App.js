import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {Context} from "./index";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {Spinner} from "react-bootstrap";
import {check} from "./http/userApi";

const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        check().then(data => {
            user.setUser(true)
            user.setIsAuth(true)
        }).finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <Spinner animation={"grow"}/>
    }

  return (
      <BrowserRouter>
          <NavBar/>
          <AppRouter/>
      </BrowserRouter>
  );
});

export default App;

