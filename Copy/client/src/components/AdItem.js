import React, {useEffect, useState} from 'react';
import {Card, Col, Image} from "react-bootstrap";
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
            <Card className="shadow-box" style={{backgroundImage: "linear-gradient(to bottom, #d7d7d7 60.5%, #0D6936 50%)", overflow: "hidden"}} border={"light"}>
                <Carousel slide={false} interval={null}>
                    {ad.image && ad.image.map(image =>
                            <Carousel.Item key={image.id}>
                                <Image
                                    className="bord"
                                    width={400}
                                    height={300}
                                    src={process.env.REACT_APP_API_URL + image.image}
                                    alt={"Загрузка картинок"}
                                />
                            </Carousel.Item>
                    )}
                </Carousel>
                <Card.Body onClick={() => navigate(AD_PAGE + '/' + ad.id)} style={{minHeight: '200px', overflow: 'hidden'}}>
                    <Card.Title style={{color: "#E7E5E5", fontFamily: 'Century Gothic', fontWeight: 500, fontSize: 20}}>{ad.name.length > 40 ? ad.name.substring(0, 40) + "..." : ad.name}</Card.Title>
                    <Card.Text style={{color: "#E7E5E5"}}>
                        Цена: {price.start ? price.start : "Нет"}
                    </Card.Text>
                    <Card.Text style={{color: "#E7E5E5"}}>
                        {ad.description.length > 40 ? ad.description.substring(0, 40) + "..." : ad.description}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default AdItem;