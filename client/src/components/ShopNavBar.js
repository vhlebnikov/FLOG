import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ShopCanvas from "./ShopCanvas";


const ShopNavBar = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Container className="mt-2">
                <Navbar.Collapse id="navbarScroll">
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">
                            <img src="/assets/img/search.svg" alt="Bootstrap" width="16" height="16" style={{color: '#0D6936'}}/>
                        </Button>
                    </Form>
                </Navbar.Collapse>
                <ShopCanvas />
            </Container>

        </Navbar>
    );
};

export default ShopNavBar;