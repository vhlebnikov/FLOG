import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {Panel} from "rsuite";
import {Col, Container, Row} from "react-bootstrap";
import FrogWithMoneyTagsAndDots from "../assets/FrogWithMoneyTagsAndDots.jpg";
import FrogInBirthdayHatWithSparks from "../assets/FrogInBirthdayHatWithSparks.jpg";
import QuestioningFrog from "../assets/QuestioningFrog.jpg";
import FrogWithCircles from "../assets/FrogWithCircles.jpg";
import FrogInCart from "../assets/FrogInCart.jpg";
import FrogWithIdea from "../assets/FrogWithIdea.jpg";
import FrogSmileGreen from "../assets/FrogSmile.svg";
import {SHOP_PAGE} from "../utils/consts";
import {useNavigate} from "react-router-dom";
import {getCategories} from "../http/categoryApi";

const Main = () => {
    const {filter} = useContext(Context)
    const navigate = useNavigate()
    const handleClick = (id) => {
        filter.setCategory(id)
        navigate(SHOP_PAGE)
    }

    const gradientTextStyles = {
        background: 'linear-gradient(to right, green, yellow)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontFamily: 'Century Gothic',
        fontWeight: 500,
        fontSize: 50
    };

    const [rootCategories, setRootCategories] = useState([])
    const createNode = async (category) => {
        const children = await getCategories(category.id)

        const label = category.name

        return {
            label,
            value: category.id,
            children: children.length ? [] : null
        }
    }

    useEffect(() => {
        getCategories(0).then(data => Promise.allSettled(data.map(i => createNode(i))))
            .then(data => setRootCategories(data.map(i => i.value)))
    }, [])


    const renderDescription = (name) => {
        let description = '';
        let image = '';

        if (name.toLowerCase() === 'купля') {
            description = 'здесь вы можете что-нибудь продать';
            image = FrogWithMoneyTagsAndDots;
        } else if (name.toLowerCase() === 'продажа') {
            description = 'здесь вы можете что-нибудь купить';
            image = FrogInCart;
        } else if (name.toLowerCase() === 'потеряшки') {
            description = 'если что-то потеряли или нашли что-нибудь потерянное';
            image = FrogWithCircles;
        } else if (name.toLowerCase() === 'мероприятия') {
            description = 'здесь вы можете организовать или присоединиться';
            image = FrogInBirthdayHatWithSparks;
        } else if (name.toLowerCase() === 'услуги') {
            description = 'например помощь с домашкой';
            image = FrogWithIdea;
        } else if (name.toLowerCase() === 'другое') {
            description = 'что-то другое';
            image = QuestioningFrog;
        }

        return { description, image };
    };


    return (
        <div>
            <Container>
                <Row>
                    <div style={{ textAlign: 'center', marginTop: '50px'  }}>
                        <h1 style={gradientTextStyles}>Добро пожаловать на FLOG</h1>
                        <p style={{ fontFamily: 'Century Gothic', fontWeight: 500, fontSize: 20}}> Ваше место для объявлений</p>
                        <img
                            className="gradientMain"
                            src={FrogSmileGreen}
                            style={{ width: '200px', height: '200px', marginTop: '10px', marginBottom: '40px'}}
                            alt={"Загрузка"}
                            onClick={() => navigate(SHOP_PAGE)}
                        />
                    </div>
                </Row>
                <Row>
                    {rootCategories.map(category => {
                        const { description, image } = renderDescription(category.label);
                        return (
                            <div key={category.value} className="col-md-4">
                                <Panel shaded style={{marginTop: 10, marginLeft: 20, marginRight: 20}} onClick={() => handleClick(category.value)}>
                                    <h5>{category.label}</h5>
                                    <img src={image} width={100} height={100} style={{ float: "right"}} alt={"Загрузка"}/>
                                    <p>{description}</p>
                                    {/*<Container>*/}
                                    {/*    <Row>*/}
                                    {/*        <h5>{category.label}</h5>*/}
                                    {/*    </Row>*/}
                                    {/*    <Row>*/}
                                    {/*        <Col>*/}
                                    {/*            <p>{description}</p>*/}
                                    {/*        </Col>*/}
                                    {/*        <img src={image} width={100} height={100} style={{ float: "right"}} alt={"Загрузка"}/>*/}
                                    {/*    </Row>*/}
                                    {/*</Container>*/}
                                </Panel>
                            </div>
                        );
                    })}
                </Row>
            </Container>
        </div>
    );
};

export default Main;