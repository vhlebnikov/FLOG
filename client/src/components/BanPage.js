import React, {useContext} from 'react';
import frog from "../assets/FrogSad.svg";
import {Button} from "react-bootstrap";
import {Context} from "../index";

const AdBlockDetected = () => {
    const {user} = useContext(Context)
    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
    }

    return (
        <div style={{ textAlign: 'center', marginTop: '50px'  }}>
            <h1>Ваш аккаунт заблокирован</h1>
            <p>Уважаемый пользователь, к сожалению, ваш аккаунт был заблокирован на нашем сайте.
                Причиной может быть нарушение наших правил, политики конфиденциальности или действий, которые опасны для нашей платформы и сообщества.
                Если вы считаете, что произошла ошибка, свяжитесь с нашей службой поддержки, чтобы обсудить ситуацию.
                В противном случае, мы не можем разблокировать ваш аккаунт, и вы больше не сможете использовать наш сайт. Спасибо за ваше понимание.</p>
            <img src={frog} alt="Error" style={{ width: '200px', height: '200px' }} />
            <h5 style={{color: "#000000"}}>Наши контакты</h5>
            <p>
                a.ramazanova1@g.nsu.ru
            </p>
            <p>
                v.khlebnikov@g.nsu.ru
            </p>
            <p>
                d.plodushcheva@g.nsu.ru
            </p>
            <p>
                v.lomakin1@g.nsu.ru
            </p>
            <Button
                className="mt-3"
                variant="outline-success btn-expensive"
                onClick={logOut}
            >
                Выйти из аккаунта
            </Button>
        </div>
    );
};

export default AdBlockDetected;