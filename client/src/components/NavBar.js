import {observer} from "mobx-react-lite";
import React, {useContext} from "react";
import {Button, Container, Dropdown, Nav, Navbar, NavDropdown, NavLink} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {ADMIN_PANEL, AUTH_PAGE, CREATE_AD_PAGE, MAIN_PAGE, PROFILE_PAGE, SHOP_PAGE} from "../utils/consts";
import frogSmile from "../assets/FrogSmileWhite.svg"

import {Context} from "../index";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
        navigate(MAIN_PAGE)
    }
    const checkAdmin = () => {
        if (user.isAuth) {
            return user.user.role === 'ADMIN'
        }
        return false
    }

    return (
        <Navbar  variant="dark" className="mainNavBar shadow-box-nav">
            <Container>
                <Navbar.Brand href={MAIN_PAGE} style={{textDecoration: 'none'}}>
                    <div className="d-flex align-items-center">
                        <img src={frogSmile} alt="Error" style={{ width: '40px', height: '40px' }} />
                        <span>FLOG</span>
                    </div>
                </Navbar.Brand>
                <Navbar.Toggle/>
                <Navbar.Collapse className={"justify-content-end"}>
                    {user.isAuth ?
                        <Nav style={{textDecorationLine: "none"}} variant="pills">
                            <Button className="btn-expensive" variant="outline-success" onClick={() => navigate(CREATE_AD_PAGE)}>Создать объявление</Button>
                            <Dropdown className="ms-2" drop={"down-centered"}>
                                <Dropdown.Toggle className="btn-expensive" variant="success" style={{width: 100}}>{"Меню"}</Dropdown.Toggle>
                                <Dropdown.Menu align={"end"}>
                                    <Dropdown.Item onClick={() => navigate(PROFILE_PAGE + '/' + user.user.id)}>
                                        Личный кабинет
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => logOut()}>Выйти</Dropdown.Item>
                                    {checkAdmin() ?
                                        <>
                                            <Dropdown.Divider/>
                                            <Dropdown.Item onClick={() => navigate(ADMIN_PANEL)}>Админ панель</Dropdown.Item>
                                        </>
                                        :
                                        null
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                        :
                        <Nav className="ms-auto" style={{color: 'white'}}>
                            <Button className="btn-expensive" variant="outline-success" onClick={() => navigate(AUTH_PAGE)}>Авторизация</Button>
                        </Nav>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
});

export default NavBar;