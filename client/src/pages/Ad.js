import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import ImageUploader2 from "../dasha/ImageUploader.css";
import ImageUploader from "../dasha/ImageUploader.js";
import photo from "../dasha/photo.png"
import {PROFILE_PAGE} from "../utils/consts";
import {useLocation, useNavigate} from "react-router-dom";
import {Context} from "../index";
import {useParams} from 'react-router-dom';
import AdStore from '../store/AdStore.js'

import component6 from "../dasha/Component6.png";
import CategoryDownFall from "../dasha/CategoryDownFall";


const Ad = () => {
    //const ad = {id: 1, name: "First and Cool", price: 1000, category: 'mhe', img: photo}
    const [ad, setAd] = useState({info: []});
    const params = useParams();
    console.log(params);
    const num = parseInt(params.id);
    console.log(num)
    //const id = 3;
    const adStore = new AdStore();
    /*useEffect(() => {
        fetchOneAd(id).then(data => setAd(data))
    }, []) */

    useEffect(() => {
        const ad = adStore.getAdById(num);
        setAd(ad);
    }, []);


    const navigate = useNavigate();
    const {user} = useContext(Context);

    return (

        <Container>
            <Row>
                <Col md={4}>
                    <div><Image className='image-2' width={280 } height={200} src={ad.image}/></div>
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">

                        <br/>
                        <div className="forPersonal">
                            <h2>Название: </h2>
                            <h2><div>{ad.name}</div> </h2>

                        </div>
                        <div className="forPersonal">
                            <h4>Описание:</h4>
                            <h4><div> {ad.description}</div></h4>
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <br/>
                    <Button variant={"outline-dark"} onClick={() => navigate(PROFILE_PAGE)}>Продавец</Button>

                    <div >

                    </div>
                    <br/>
                    <div>Категория: {ad.sub_sub_category_id}</div>
                    <div>Адрес: {ad.address}</div>
                    <div>Цена: {ad.price_id}</div>
                    <br/>
                    <br/>

                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
            </Row>
        </Container>
    );

};

export default Ad;

/*
<div className="forPersonal">
                            <h2>Название: </h2>
                            {isEditing
                                ? (<input className = "personalInput"
                                          type="text"
                                          value={ad.name}
                                          onChange={(event) => setName(event.target.value)}/>)
                                : (<div>{ad.name}</div>)}

                        </div>

                    //
                    Описание:
                            {isEditing
                                ? (<input className = "personalInput"
                                          type="text"
                                          value={ad.title}
                                          onChange={(event) => setTitle(event.target.value)}/>)
                                : (<div>{ad.title}</div>)}

 {isEditing
                        ? <CategoryDownFall/>
                        : <div>Категория: {adD.category}</div>}

 */