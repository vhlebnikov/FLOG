import React, {useEffect, useState} from 'react';
import {Button, Card, Col} from "react-bootstrap";
import {AD_PAGE} from "../utils/consts";
import {useNavigate} from "react-router-dom";
import {getPrice} from "../http/adApi";

const AdItem = ({ad}) => {
    const navigate = useNavigate()

    const [price, setPrice] = useState(0)

    useEffect(() => {
        getPrice(ad.priceId).then(data => setPrice(data))
    }, [])

    return (
        <Col md={3} className={"mt-3"} onClick={() => navigate(AD_PAGE + '/' + ad.id)}>
            <Card className="addItem" border={"light"}>
                <Card.Img variant="top" src={process.env.REACT_APP_API_URL + ad.image} />
                <Card.Body>
                    <Card.Title>{ad.name}</Card.Title>
                    <Card.Text>
                        Цена: {price.start ? price.start : 'Нет'}
                    </Card.Text>
                    <Card.Text>
                        {ad.description}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default AdItem;