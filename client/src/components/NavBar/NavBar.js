import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import React, {useContext, useState} from "react";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {ACCOUNT_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../../utils/consts";
import cl from "./NavBar.css"
import PostForm from "../../vlad/components/PostForm";
import MyModal from "../MyModal/MyModal";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const [modal, setModal] = useState(false)
    const [posts, setPosts] = useState([])
    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(true)
    }

    return (
        <Navbar variant="dark" className="nav">
            <Container>
                <Navbar.Brand href="#home">FLOG</Navbar.Brand>
                {user.isAuth ?
                    <>
                        <Nav>
                            <Button variant="success" className="my-3 text-center"onClick={() => setModal(true)}>
                                Создать объявление
                            </Button>
                        </Nav>
                        <Nav className="justify-content-center">
                            <Button variant="outline-light" className="" onClick={() => navigate(ACCOUNT_ROUTE)}>Личный кабинет</Button>
                        </Nav>
                    </>
                    :
                    <Nav className="ms-auto" style={{color: 'white'}}>
                        <Button variant="outline-light" onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>

                }
            </Container>
        </Navbar>
    );
});

export default NavBar;