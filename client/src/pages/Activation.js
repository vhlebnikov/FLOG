import React, {useContext, useEffect, useState} from "react";
import {Context} from "../index";
import {useNavigate, useParams} from "react-router-dom";
import {AUTH_PAGE, MAIN_PAGE, SHOP_PAGE} from "../utils/consts";
import jwt_decode from "jwt-decode";
import {observer} from "mobx-react-lite";
import frogSmile from "../assets/FrogSmile.svg";
import frogSad from  "../assets/FrogSad.svg"

const Activation = observer( () => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const params = useParams();

    const [error, setError] = useState(false)

    const validate = async () => {
        try {
            if (params.id === "bad_request") {
                setError(true)
            } else {
                let data = jwt_decode(params.id)
                localStorage.setItem('token', params.id)
                user.setUser(data)
                user.setIsAuth(true)
            }
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    useEffect(() => {
        validate()
        setTimeout(() => {
            if (error) {
                navigate(AUTH_PAGE, {replace: true})
            } else {
                navigate(MAIN_PAGE, {replace: true})
            }
        }, 2000)
    }, [])

    return (
        <div style={{ textAlign: 'center', marginTop: '50px'  }}>
            <h1>{error ? "Ссылка устарела" : "Вы успешно подтвердили свою почту"}</h1>
            <p>
                {error ?
                    "Попробуйте перейти по ссылке из свежего письма или отправьте новое письмо подтверждения"
                    :
                    "Добро пожаловать"
                }
            </p>
            <img src={error ? frogSad : frogSmile} alt="Error" style={{ width: '200px', height: '200px' }} />

        </div>
    )
})

export default Activation;
