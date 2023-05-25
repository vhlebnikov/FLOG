import 'bootstrap/dist/css/bootstrap.min.css';
import 'rsuite/dist/rsuite.min.css';
import './App.css';
import {BrowserRouter, useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {Context} from "./index";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {Spinner} from "react-bootstrap";
import {check} from "./http/userApi";
import Footer from "./dasha/Footer";

const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        check().then(data => {
            user.setUser(data)
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
          <Footer/>
      </BrowserRouter>
  );
});

export default App;

