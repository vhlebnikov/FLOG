import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import AdsList from "../components/AdsList";
import {Context} from "../index";
import ShopNavBar from "../components/ShopNavBar";
import {getAllAds} from "../http/adAPI";
import {Placeholder} from "rsuite";

const Shop = (search) => {
    const {ad} = useContext(Context)

    useEffect(() => {
        getAllAds(null, null, null, 10, 1).then(data => ad.setAds(data.rows))
    })
    return (
        <Container>
            <ShopNavBar/>
            <Row className="mt-2">
                {/*<Col md={3}>*/}
                {/*    <TypeBar/>*/}
                {/*</Col>*/}
                <Col>
                    <AdsList/>
                </Col>

            </Row>
        </Container>
    );
};

export default Shop;