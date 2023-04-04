import React from 'react';
import {Button, Card, Col} from "react-bootstrap";
import {AD_PAGE} from "../utils/consts";
import {useNavigate} from "react-router-dom";

const AdItem = ({ad}) => {
    const navigate = useNavigate()
    return (
        <Col md={3} className={"mt-3"} onClick={() => navigate(AD_PAGE + '/' + ad.id)}>
            <Card className="addItem" border={"light"}>
                <Card.Img variant="top" src={ad.image} />
                <Card.Body>
                    <Card.Title>{ad.name}</Card.Title>
                    <Card.Text>
                        {ad.price_id}
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