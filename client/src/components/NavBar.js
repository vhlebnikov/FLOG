import {observer} from "mobx-react-lite";
import React, {useContext} from "react";
import {Button, Container, Nav, Navbar, NavDropdown, NavLink} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {ADMIN_PANEL, AUTH_PAGE, CREATE_AD_PAGE, PROFILE_PAGE, SHOP_PAGE} from "../utils/consts";
import {getCurrentUserId} from "../http/userApi";

import {Context} from "../index";

const NavBar = observer(() => {
    const {user} = useContext(Context)

    const checkAdmin = () => {
        if (user.isAuth) {
            return user.user.role === 'ADMIN'
        }
        return false
    }

    const navigate = useNavigate()
    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
        navigate(SHOP_PAGE)
    }

        return (
        <Navbar variant="dark" className="mainNavBar shadow-box-nav">
            <Container fluid>
                <Navbar.Brand href={SHOP_PAGE}>FLOG</Navbar.Brand>
                {user.isAuth ?
                    <>
                        <Nav style={{textDecorationLine: "none"}}>

                            <NavDropdown
                                menuVariant="success"
                                title="Меню"
                                className="mx-auto"
                                id="collasible-nav-dropdown"

                            >
                                <NavDropdown.Item onClick={() => navigate(PROFILE_PAGE + '/' + user.user.id)}>
                                    Личный кабинет
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={() => logOut()}>Выйти</NavDropdown.Item>
                                {checkAdmin() ?
                                    <>
                                        <NavDropdown.Divider/>
                                        <NavDropdown.Item onClick={()=>navigate(ADMIN_PANEL)}>Админ панель</NavDropdown.Item>
                                    </>
                                    :
                                    null
                                }
                            </NavDropdown>
                            <NavLink onClick={() => navigate(CREATE_AD_PAGE)}>Создать объявление</NavLink>
                        </Nav>
                        {/*<Nav>*/}
                        {/*    <Button className="btn-expensive" variant="outline-light" onClick={() => navigate(CREATE_AD_PAGE)}>*/}
                        {/*        Создать объявление*/}
                        {/*    </Button>*/}
                        {/*</Nav>*/}
                        {/*<Nav className="justify-content-center">*/}
                        {/*    <Button className="btn-expensive" variant="outline-light" onClick={() => navigate(PROFILE_PAGE + '/' + user.user.id)}>Личный кабинет</Button>*/}
                        {/*    <Button variant="outline-light" className="ms-3 btn-expensive" onClick={() => logOut()}>Выйти</Button>*/}
                        {/*</Nav>*/}
                    </>
                    :
                    <Nav className="ms-auto" style={{color: 'white'}}>
                        <NavLink onClick={() => navigate(AUTH_PAGE)}>Авторизация</NavLink>
                        {/*<Button className="btn-expensive" variant="outline-light" onClick={() => navigate(AUTH_PAGE)}>Авторизация</Button>*/}
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;