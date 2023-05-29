import React from 'react';
import {Card, Col, Image} from "react-bootstrap";
import {AD_PAGE} from "../utils/consts";
import {useNavigate} from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";

const AdItem = ({ad}) => {
    const navigate = useNavigate()

    return (
        <Col md={4} className={"mb-3"}>
            <Card className="shadow-box" style={{backgroundImage: "linear-gradient(to bottom, #d7d7d7 60.5%, #0D6936 50%)"}} border={"light"}>
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
                    {ad.status ?
                        (
                            <div>
                                {ad.status === 1 && (
                                    <hr style={{ backgroundColor: '#04ff00', height: '2px', border: 'none', marginTop: '0.5rem', marginBottom: '1rem' }} />
                                )}
                                {ad.status === 2 && (
                                    <hr style={{ backgroundColor: '#d4e79e', height: '2px', border: 'none', marginTop: '0.5rem', marginBottom: '1rem' }} />
                                )}
                                {ad.status === 3 && (
                                    <hr style={{ backgroundColor: '#ff0000', height: '2px', border: 'none', marginTop: '0.5rem', marginBottom: '1rem' }} />
                                )}
                            </div>
                        ) : (
                            <div className="spinner-border" role="status">
                                <span className="sr-only"/>
                            </div>
                        )}
                    <Card.Text style={{color: "#E7E5E5"}}>
                        Цена: {" "}
                        {ad.price.type === 0 ? "Без цены"
                        :
                        ad.price.type === 1 ?
                            (ad.price.start ? ad.price.start + " ₽" : "Загрузка")
                            :
                        ad.price.type === 2 ?
                            (ad.price.start && ad.price.end ? ad.price.start + "-" + ad.price.end + " ₽" : "Загрузка")
                            : "Загрузка"
                        }
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