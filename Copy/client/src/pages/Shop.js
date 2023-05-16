import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import AdsList from "../components/AdsList";
import {Context} from "../index";
import ShopNavBar from "../components/ShopNavBar";
import ShopCanvas from "../components/ShopCanvas";
import {getAllAds} from "../http/adApi";

const Shop = () => {
    const {ad} = useContext(Context)

    useEffect(() => {
        getAllAds(null, null, null, 30, 1).then(data => ad.setAds(data.rows))
    })
    return (
        <Container>
            <ShopNavBar/>
            <Row className="mt-2">
                <Col md={12}>
                    <AdsList/>
                </Col>
            </Row>
        </Container>
    );
};

export default Shop;