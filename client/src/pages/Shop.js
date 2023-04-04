import React, {useContext} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import AdsList from "../components/AdsList";
import {Context} from "../index";
import ShopNavBar from "../components/ShopNavBar";
import ShopCanvas from "../components/ShopCanvas";

const Shop = () => {
    return (
        <Container>
            <ShopNavBar/>
            <Row className="mt-2">
                <Col md={3}>
                    <TypeBar/>
                </Col>
                <Col md={9}>
                    <AdsList/>

                </Col>

            </Row>
        </Container>
    );
};

export default Shop;