import {Button, Card, Container, Form, Nav, NavLink} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {Context} from "../index";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {AUTH_PAGE, REGISTRATION_PAGE, SHOP_PAGE} from "../utils/consts";
import {login, registration, sendConfirmationMail} from "../http/userApi";
import VerEx from "verbal-expressions";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const [isLogin, setIsLogin] = useState(location.pathname === AUTH_PAGE)
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [emailError, setEmailError] = useState("Введите email")
    const [usernameError, setUsernameError] = useState("Введите имя")
    const [passwordError, setPasswordError] = useState("Введите пароль")

    const [submit, setSubmit] = useState(false)

    const [unconfirmed, setUnconfirmed] = useState(false)

    const emailRegExp = VerEx().startOfLine().anythingBut(' ').then('@').anythingBut(' ').then('nsu.ru').endOfLine()
    const notEmptyRegExp = VerEx().startOfLine().something().endOfLine()
    const isValidEmail = (email) => {
        const ans = emailRegExp.test(email)
        emailRegExp.lastIndex = 0
        return ans
    }
    const notEmpty = (word) => {
        const ans = notEmptyRegExp.test(word)
        notEmptyRegExp.lastIndex = 0
        return ans
    }

    const emailHandler = (e) => {
        setEmail(e.target.value)
        setUnconfirmed(false)
        if (!notEmpty(e.target.value)) {
            setEmailError("Введите email")
            setSubmit(false)
        }
        else if (!isValidEmail(e.target.value)) {
            setEmailError("Некорректный email")
            setSubmit(false)
        } else {
            setEmailError(null)
        }
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
        if (!notEmpty(e.target.value)) {
            setPasswordError("Введите пароль")
            setSubmit(false)
        } else {
            setPasswordError(null)
        }
    }

    const usernameHandler = (e) => {
        setUsername(e.target.value)
        if (!notEmpty(e.target.value)) {
            setUsernameError("Введите имя")
            setSubmit(false)
        } else {
            setUsernameError(null)
        }
    }

    useEffect(() => {
        setIsLogin(location.pathname === AUTH_PAGE)
    }, [location.pathname])

    useEffect(() => {
        if (isLogin) {
            if (!emailError && !passwordError) {
                setSubmit(true)
            }
        } else {
            if (!emailError && !passwordError && !usernameError) {
                setSubmit(true)
            }
        }
    }, [emailError, usernameError, passwordError, isLogin])

    const sendMail = () => {
        sendConfirmationMail(email).then(data => alert(data.message))
    }

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
                user.setUser(data)
                user.setIsAuth(true)
                navigate(SHOP_PAGE)
            } else {
                data = await registration(email, password, username);
                alert(data.message)
                navigate(AUTH_PAGE)
            }
        } catch (e) {
            if (e.response.data.message === "Подтвердите аккаунт") {
                setUnconfirmed(true)
            }
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
                        <div>
                            <Form.Control
                                className="mt-3"
                                placeholder="Введите ваше имя..."
                                value={username}
                                onChange={e => usernameHandler(e)}
                            />
                            {usernameError ? <Form.Label style={{color: 'red'}}>{usernameError}</Form.Label> : null}
                        </div>
                    }
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш email..."
                        value={email}
                        onChange={e => emailHandler(e)}
                    />
                    {emailError ? <Form.Label style={{color: 'red'}}>{emailError}</Form.Label> : null}

                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш пароль..."
                        value={password}
                        onChange={e => passwordHandler(e)}
                        type="password"
                    />
                    {passwordError ? <Form.Label style={{color: 'red'}}>{passwordError}</Form.Label> : null}

                    <Form.Text className="d-flex justify-content-between mt-3">
                        {isLogin ?
                            <Nav className="d-inline-flex align-items-center">
                                Нет аккаунта?<NavLink as={Link} to={REGISTRATION_PAGE}>Зарегистрируйся!</NavLink>
                            </Nav>
                            :
                            <Nav className="d-inline-flex align-items-center">
                                Есть аккаунт? <Nav.Link as={Link} to={AUTH_PAGE}>Войдите!</Nav.Link>
                            </Nav>
                        }

                        <div>
                            {unconfirmed ?
                                <Button
                                    variant="link"
                                    size={'sm'}
                                    onClick={sendMail}
                                >
                                    Отправить повторное письмо подтверждения
                                </Button>
                                : null}
                        </div>

                        <Button
                            variant={"outline-success"}
                            onClick={click}
                            disabled={!submit}
                        >
                            {isLogin ? 'Войти' : 'Регистрация'}
                        </Button>
                    </Form.Text>
                </Form>
            </Card>
        </Container>
    );
})

export default Auth;