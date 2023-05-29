import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import AdsList from "../components/AdsList";
import {Context} from "../index";
import ShopNavBar from "../components/ShopNavBar";
import {getAllAds} from "../http/adApi";
import PaginationShop from "../components/PaginationShop";
import {observer} from "mobx-react-lite";
import Filtration from "../components/Filtration";
import TypeBar from "../components/TypeBar";


const Shop = observer(() => {
    const {ad} = useContext(Context)
    const {filter} = useContext(Context)
    const [activePage, setActivePage] = useState(1)
    const [limit, setLimit] = useState(12)
    const [count, setCount] = useState(0)

    useEffect(() => {
        getAllAds(filter.category, filter.price, filter.status, filter.substring, limit, activePage).then(data => {ad.setAds(data.rows); setCount(data.count)})
    }, [filter.category, filter.price, filter.status, filter.substring, limit, activePage])

    return (
        <Container>
            {/*<ShopNavBar/>*/}
            <Row className="mt-3">
                <Col md={3}>
                    <TypeBar/>
                </Col>
                <Col md={9}>
                    <AdsList/>
                    <PaginationShop
                        activePage={activePage}
                        setActivePage={setActivePage}
                        limit={limit}
                        setLimit={setLimit}
                        count={count}
                    />
                </Col>

            </Row>

        </Container>
    );
});

export default Shop;