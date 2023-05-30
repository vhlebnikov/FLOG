import {
    Button,
    Card,
    Col,
    Container,
    Form,
    InputGroup,
    Nav,
    NavLink,
    Row,
    Toast,
    ToastContainer
} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {Context} from "../index";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {AUTH_PAGE, MAIN_PAGE, REGISTRATION_PAGE, SHOP_PAGE} from "../utils/consts";
import {login, registration, sendConfirmationMail} from "../http/userApi";
import VerEx from "verbal-expressions";
import frog from "../assets/FrogSmile.svg";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const [isLogin, setIsLogin] = useState(location.pathname === AUTH_PAGE)
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [emailError, setEmailError] = useState(null)
    const [usernameError, setUsernameError] = useState(null)
    const [passwordError, setPasswordError] = useState(null)

    const [submit, setSubmit] = useState(false)

    const [unconfirmed, setUnconfirmed] = useState(false)

    const [alertMessage, setAlertMessage] = useState(null)

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
        } else if (!isValidEmail(e.target.value)) {
            setEmailError("Некорректный email (домен должен принадлежать НГУ)")
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
        sendConfirmationMail(email).then(data => setAlertMessage(data.message))
    }

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                if (!notEmpty(email) || !notEmpty(password)) {
                    if (!notEmpty(email)) {
                        setEmailError("Введите email")
                        setSubmit(false)
                    }
                    if (!notEmpty(password)) {
                        setPasswordError("Введите пароль")
                        setSubmit(false)
                    }
                    return
                }

                data = await login(email, password);
                user.setUser(data)
                user.setIsAuth(true)
                navigate(MAIN_PAGE)
            } else {
                if (!notEmpty(email) || !notEmpty(password) || !notEmpty(username)) {
                    if (!notEmpty(email)) {
                        setEmailError("Введите email")
                        setSubmit(false)
                    }
                    if (!notEmpty(password)) {
                        setPasswordError("Введите пароль")
                        setSubmit(false)
                    }
                    if (!notEmpty(username)) {
                        setUsernameError("Введите имя")
                        setSubmit(false)
                    }
                    return
                }

                data = await registration(email, password, username);
                setAlertMessage(data.message)
                navigate(AUTH_PAGE)
            }
        } catch (e) {
            if (e.response.data.message === "Подтвердите аккаунт") {
                setUnconfirmed(true)
            }
            setAlertMessage(e.response.data.message)
        }
    }

    return (
        <div>
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{height: window.innerHeight - 100}}
            >
                <Card style={{width: 600}} className="p-5">
                    <h2 className="m-auto">{isLogin ? 'Авторизация' : "Регистрация"}</h2>
                    <Form className="d-flex flex-column">
                        {isLogin ?
                            null
                            :
                            <InputGroup hasValidation>
                                <Form.Control
                                    className="mt-3"
                                    placeholder="Введите ваше имя..."
                                    value={username}
                                    required
                                    isInvalid={!!usernameError}
                                    onChange={e => usernameHandler(e)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {usernameError}
                                </Form.Control.Feedback>
                            </InputGroup>
                        }
                        <InputGroup hasValidation>
                            <Form.Control
                                className="mt-3"
                                placeholder="Email"
                                value={email}
                                required
                                isInvalid={!!emailError}
                                onChange={e => emailHandler(e)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {emailError}
                            </Form.Control.Feedback>
                        </InputGroup>

                        <InputGroup hasValidation>
                            <Form.Control
                                className="mt-3"
                                placeholder="Пароль"
                                value={password}
                                required
                                isInvalid={!!passwordError}
                                onChange={e => passwordHandler(e)}
                                type="password"
                            />
                            <Form.Control.Feedback type="invalid">
                                {passwordError}
                            </Form.Control.Feedback>
                        </InputGroup>

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
                <ToastContainer
                    className="p-3"
                    position={'bottom-end'}
                >
                    <Toast
                        onClose={() => setAlertMessage(null)}
                        show={!!alertMessage}
                        delay={3000}
                        autohide
                    >
                        <Toast.Header>
                            <img
                                width={30}
                                height={30}
                                src={frog}
                                className="rounded me-2"
                                alt=""
                            />
                            <strong className="me-auto">FLOG</strong>
                        </Toast.Header>
                        <Toast.Body>
                            {alertMessage}
                        </Toast.Body>
                    </Toast>
                </ToastContainer>
            </Container>
        </div>
    );
})

export default Auth;