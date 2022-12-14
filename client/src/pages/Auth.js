import {Button, Card, Container, Form, Nav, NavLink} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {useContext, useState} from "react";
import {Context} from "../index";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, username, password);
            }
            user.setUser(data)
            user.setIsAuth(true)
            navigate(SHOP_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }
    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : "Регистрация"}</h2>
                <Form className="d-flex flex-column">
                    {isLogin ?
                        null
                    :
                        <Form.Control
                            className="mt-3"
                            placeholder="Введите ваше имя..."
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                    }
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш email..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш пароль..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Form className="d-flex justify-content-between mt-3">
                            {isLogin ?
                                <Nav className="d-inline-flex align-items-center">
                                    Нет аккаунта?<NavLink as={Link} to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                                </Nav>
                                :
                                <Nav className="d-inline-flex align-items-center">
                                    Есть аккаунт? <Nav.Link as={Link} to={LOGIN_ROUTE}>Войдите!</Nav.Link>
                                </Nav>
                            }
                            <Button
                                variant={"outline-success"}
                                onClick={click}
                            >
                                {isLogin ? 'Войти' : 'Регистрация'}
                            </Button>
                    </Form>
                </Form>
            </Card>
        </Container>
    );
})

export default Auth;