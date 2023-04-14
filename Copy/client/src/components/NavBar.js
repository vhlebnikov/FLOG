import {observer} from "mobx-react-lite";
import React, {useContext, useState} from "react";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {AUTH_PAGE, CREATE_AD_PAGE, PROFILE_PAGE, SHOP_PAGE} from "../utils/consts";

import {Context} from "../index";
import {getMyId} from "../http/userApi";

const NavBar = observer(() => {
    const [id,setId] = useState(0)
    const navigate = useNavigate()
    const {user} = useContext(Context)
    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
        navigate(SHOP_PAGE)
    }
    const changeId = () => {
        getMyId().then(data => {
            setId(data)
        })
    }
        return (
        <Navbar variant="dark" className="mainNavBar">
            <Container>
                <Navbar.Brand href={SHOP_PAGE}>FLOG</Navbar.Brand>
                {user.isAuth ?
                    <>
                        <Nav>
                            <Button variant="outline-light" onClick={() => navigate(CREATE_AD_PAGE)}>
                                Создать объявление
                            </Button>
                        </Nav>
                        <Nav className="justify-content-center">
                            <Button variant="outline-light" onClick={() => {
                                changeId()
                                navigate(PROFILE_PAGE + '/' + id) }}
                                >Личный кабинет</Button>
                            <Button variant="outline-light" className="ms-3" onClick={() => logOut()}>Выйти</Button>
                        </Nav>
                    </>
                    :
                    <Nav className="ms-auto" style={{color: 'white'}}>
                        <Button variant="outline-light" onClick={() => navigate(AUTH_PAGE)}>Авторизация</Button>
                    </Nav>

                }
            </Container>
        </Navbar>
    );
});

export default NavBar;