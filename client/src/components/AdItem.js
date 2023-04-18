import React, {useEffect, useState} from 'react';
import {Button, Card, Col} from "react-bootstrap";
import {AD_PAGE} from "../utils/consts";
import {useNavigate} from "react-router-dom";
import {getPrice} from "../http/adApi";
import Carousel from "react-bootstrap/Carousel";

const AdItem = ({ad}) => {
    const navigate = useNavigate()

    const [price, setPrice] = useState(0)

    useEffect(() => {
        getPrice(ad.priceId).then(data => setPrice(data))
    }, [])

    return (
        <Col md={3} className={"mt-3"}>
            <Card className="addItem" border={"light"}>
                <Carousel slide={false} interval={null}>
                {ad.image.map(image =>
                        <Carousel.Item key={image.id}>
                            <Card.Img key={image.id} variant="top" src={process.env.REACT_APP_API_URL + image.image} />
                        </Carousel.Item>
                    // <Card.Img key={image.id} variant="top" src={process.env.REACT_APP_API_URL + image.image} />
                )}
                </Carousel>
                <Card.Body onClick={() => navigate(AD_PAGE + '/' + ad.id)}>
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