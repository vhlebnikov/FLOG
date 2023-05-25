import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {Panel} from "rsuite";
import {Breadcrumb, BreadcrumbItem, Col, Form, Row} from "react-bootstrap";
import FrogWithMoneyTagsAndDots from "../assets/FrogWithMoneyTagsAndDots.jpg";
import FrogInBirthdayHatWithSparks from "../assets/FrogInBirthdayHatWithSparks.jpg";
import QuestioningFrog from "../assets/QuestioningFrog.jpg";
import FrogWithCircles from "../assets/FrogWithCircles.jpg";
import FrogInCart from "../assets/FrogInCart.jpg";
import FrogWithIdea from "../assets/FrogWithIdea.jpg";
import FrogSmileGreen from "../assets/FrogSmileGreen.svg";
import {SHOP_PAGE} from "../utils/consts";
import {useNavigate} from "react-router-dom";
import {getCategories} from "../http/categoryApi";



const Main = () => {
    const {ad} = useContext(Context) // общее состояние


    const navigate = useNavigate()
    const handleClick = (id) => {
        //ad.setFilter("1")

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

        if (name === 'Купля') {
            description = 'здесь вы можете что-нибудь продать';
            image = FrogWithMoneyTagsAndDots;
        } else if (name === 'Продажа') {
            description = 'здесь вы можете что-нибудь купить';
            image = FrogInCart;
        } else if (name === 'Потеряшки') {
            description = 'если что-то потеряли или нашли что-нибудь потерянное';
            image = FrogWithCircles;
        } else if (name === 'Мероприятия') {
            description = 'здесь вы можете организовать или присоединиться';
            image = FrogInBirthdayHatWithSparks;
        } else if (name === 'Услуги') {
            description = 'например помощь с домашкой';
            image = FrogWithIdea;
        } else if (name === 'Другое') {
            description = 'что-то другое';
            image = QuestioningFrog;
        }

        return { description, image };
    };


    return (
        <div>
            <Row>
                <div style={{ textAlign: 'center', marginTop: '50px'  }}>
                    <h1 style={gradientTextStyles}>Добро пожаловать на FLOG</h1>
                    <p style={{ fontFamily: 'Century Gothic', fontWeight: 500, fontSize: 20}}> Ваше место для объявлений</p>
                    <img className="gradientMain" src={FrogSmileGreen} style={{ width: '200px', height: '200px', marginTop: '10px', marginBottom: '40px'    }}  alt={"Загрузка"}/>
                </div>
            </Row>
            <Row>
                {rootCategories.map(category => {
                    const { description, image } = renderDescription(category.label);
                    return (
                        <div key={category.value} className="col-md-4">
                            <Panel shaded style={{marginTop: 10, marginLeft: 20, marginRight: 20}} onClick={() => handleClick(1)}>
                                <h5>{category.label}</h5>
                                <img src={image} width={100} height={100} style={{ float: "right"}} alt={"Загрузка"}/>
                                <p>{description}</p>
                            </Panel>
                        </div>
                    );
                })}
            </Row>

        </div>
    );
};

export default Main;