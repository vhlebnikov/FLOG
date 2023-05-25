import React, {useContext, useEffect, useState} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "rsuite/Dropdown";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import searchImage from "../assets/search.svg"
import CategoryCascader from "./CategoryCascader";
import {Input, InputGroup} from "rsuite";
import SearchIcon from '@rsuite/icons/Search';
import {Col, Nav, Row} from "react-bootstrap";

const ShopNavBar = observer(() => {
    const {ad} = useContext(Context)
    const [selectedItem, setSelectedItem] = useState('Сортировка');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const handleSelect = (eventKey, event) => {
        setSelectedItem(event.target.innerText);
    };

    useEffect(() => {
        console.log(selectedCategory)
    }, [selectedCategory])

    return (
        <Navbar expand="lg" className="mt-3 shadow-box shopNavBar ">

            <Container fluid>
                <Nav>
                    <CategoryCascader others={[selectedCategory, setSelectedCategory]}/>
                </Nav>
                <Nav>
                    <InputGroup>
                        <Input/>
                        <InputGroup.Button>
                            <SearchIcon/>
                        </InputGroup.Button>
                    </InputGroup>
                </Nav>
                {/*<Nav>*/}
                {/*    <Dropdown variant="light" title={selectedItem} style={{color: "#0D6936"}} onSelect={handleSelect}>*/}
                {/*        <Dropdown.Item eventKey="По названию" onClick={() => {*/}
                {/*            setSelectedItem('По названию')*/}
                {/*            ad.setSort('name')*/}
                {/*        }}>По названию</Dropdown.Item>*/}
                {/*        <Dropdown.Item onClick={() => {*/}
                {/*            setSelectedItem('По цене')*/}
                {/*            ad.setSort('')*/}
                {/*        }}>По цене</Dropdown.Item>*/}
                {/*        <Dropdown.Item onClick={() => {*/}
                {/*            setSelectedItem('По дате')*/}
                {/*            ad.setSort('createdAt')*/}
                {/*        }}>По дате</Dropdown.Item>*/}
                {/*    </Dropdown>*/}
                {/*</Nav>*/}
                {/*<Navbar.Toggle aria-controls="basic-navbar-nav" />*/}
                {/*<Row>*/}
                {/*    <Col className="my-1">*/}
                {/*        <CategoryCascader/>*/}
                {/*    </Col>*/}
                {/*    <Col className="my-1">*/}
                {/*        <InputGroup>*/}
                {/*            <Input/>*/}
                {/*            <InputGroup.Button>*/}
                {/*                <SearchIcon/>*/}
                {/*            </InputGroup.Button>*/}
                {/*        </InputGroup>*/}
                {/*    </Col>*/}
                {/*    <Col className="my-1">*/}
                {/*        <Dropdown variant="light" title={selectedItem} style={{color: "#0D6936"}} onSelect={handleSelect}>*/}
                {/*            <Dropdown.Item eventKey="По названию" onClick={() => {*/}
                {/*                setSelectedItem('По названию')*/}
                {/*                ad.setSort('name')*/}
                {/*            }}>По названию</Dropdown.Item>*/}
                {/*            <Dropdown.Item onClick={() => {*/}
                {/*                setSelectedItem('По цене')*/}
                {/*                ad.setSort('')*/}
                {/*            }}>По цене</Dropdown.Item>*/}
                {/*            <Dropdown.Item onClick={() => {*/}
                {/*                setSelectedItem('По дате')*/}
                {/*                ad.setSort('createdAt')*/}
                {/*            }}>По дате</Dropdown.Item>*/}
                {/*        </Dropdown>*/}
                {/*    </Col>*/}
                {/*</Row>*/}
                {/*<Navbar.Collapse id="basic-navbar-nav">*/}


                {/*<Form className="d-flex">*/}
                {/*    <Form.Control*/}
                {/*        type="search"*/}
                {/*        placeholder="Поиск..."*/}
                {/*        bg = "success"*/}
                {/*        className="me-2"*/}
                {/*        style={{width: 500, border: "none"}}*/}
                {/*        aria-label="Search"*/}
                {/*        value={ad.filter}*/}
                {/*        onChange={e => ad.setFilter(e.target.value)}*/}
                {/*    />*/}
                {/*    <Button variant="light" style={{background:'#ffffff'}}>*/}
                {/*        <img src = {searchImage} width="16" height="16" style={{color: '#0D6936', paddingBottom:1}}/>*/}
                {/*    </Button>*/}
                {/*</Form>*/}

                {/*</Navbar.Collapse>*/}
            </Container>
        </Navbar>
    );
});

export default ShopNavBar;