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
import {useDetectAdBlock} from "adblock-detect-react";
import AdBlockDetected from "./components/AdBlockDetected";
import BanPage from "./components/BanPage";

const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    const [adBlock, setAdBlock] = useState(false)
    const [timer, setTimer] = useState(false)

    const adBlockDetected = useDetectAdBlock();

    useEffect(() => {
        setTimeout(() => {
            setTimer(true)
        }, 1000)
    }, [])

    useEffect(() => {
        if (adBlockDetected) {
            setAdBlock(true)
        }
    }, [timer])

    useEffect(() => {
        check().then(data => {
            user.setUser(data)
            user.setIsAuth(true)
        }).catch(e => {
            console.log("Не авторизован")
        })
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <Spinner animation={"grow"}/>
    }

  return (
      <BrowserRouter>
          {adBlock ?
              <AdBlockDetected/>
          :
              (user.isAuth && user.user.role === 'BANNED' ?
                <BanPage/>
              :
                      <div className='footerApp'>
                          <NavBar/>
                          <AppRouter/>
                          <Footer/>
                      </div>
              )
          }
      </BrowserRouter>
  );
});

export default App;

