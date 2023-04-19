import {observer} from "mobx-react-lite";
import React, {useContext} from "react";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {AUTH_PAGE, CREATE_AD_PAGE, PROFILE_PAGE, SHOP_PAGE} from "../utils/consts";
import {getCurrentUserId} from "../http/userApi";

import {Context} from "../index";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
        navigate(SHOP_PAGE)
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
                            <Button variant="outline-light" onClick={() => navigate(PROFILE_PAGE)}>Личный кабинет</Button>
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