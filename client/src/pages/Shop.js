import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import AdsList from "../components/AdsList";
import {Context} from "../index";
import ShopNavBar from "../components/ShopNavBar";
import {getAllAds} from "../http/adApi";
import PaginationShop from "../components/PaginationShop";
import {observer} from "mobx-react-lite";


const Shop = observer(() => {
    const {ad} = useContext(Context)
    const {filter} = useContext(Context)
    const [activePage, setActivePage] = useState(1)
    const [limit, setLimit] = useState(12)
    const [count, setCount] = useState(0)

    useEffect(() => {
        getAllAds(filter.category, limit, activePage).then(data => {ad.setAds(data.rows); setCount(data.count)})
        console.log(count)
    }, [filter.category, limit, activePage])

    return (
        <Container>
            <ShopNavBar/>
            <Row className="mt-2">
                <Col md={12}>
                    <AdsList/>
                </Col>
                <PaginationShop
                    activePage={activePage}
                    setActivePage={setActivePage}
                    limit={limit}
                    setLimit={setLimit}
                    count={count}
                />
            </Row>

        </Container>
    );
});

export default Shop;