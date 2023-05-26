import React, {useContext, useEffect, useState} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import CategoryCascader from "./CategoryCascader";
import {Input, InputGroup} from "rsuite";
import SearchIcon from '@rsuite/icons/Search';
import {Col, Nav, Row} from "react-bootstrap";

const ShopNavBar = observer(() => {
    const {filter} = useContext(Context)
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        filter.setCategory(selectedCategory)
    }, [selectedCategory])

    return (
        <Navbar expand="lg" className="mt-3 shadow-box shopNavBar ">
            <Container fluid>
                <Nav className="my-2">
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
            </Container>
        </Navbar>
    );
});

export default ShopNavBar;