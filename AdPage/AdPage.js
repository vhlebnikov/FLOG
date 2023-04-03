import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import ImageUploader2 from "../dasha/ImageUploader.css";
import ImageUploader from "../dasha/ImageUploader.js";
import photo from "../dasha/photo.png"
import {SELLER} from "../utils/consts";
import {useNavigate} from "react-router-dom";
import {Context} from "../index";
import component6 from "../dasha/Component6.png";
import Ra from "../dasha/Ra";



const AdPage = () => {
    //const [ad, setAd] = useState({info: []})
    const adD = {id: 1, name: "First and Cool", price: 1000, category: 'mhe', img: photo}
    const description = [
        {id:1, title: 'hehehehe', description: '5rrrr'},
        {id:2, title: 'HeheheHehehe', description: '6rrrr'},
    ]

    const navigate = useNavigate()

    const {user} = useContext(Context)
    const {ad} = useContext(Context)

    const [isEditing, setEditing] = useState(false)
    const [nameLoc, setName] = useState('')
    const [titleLoc, setTitle] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('');
    const handleSelectCategory = (category) => {
        setSelectedCategory(category);
        // Do something with the selected category, like save it to the ad information
    };

    const handleEditing = () => {
        setEditing(true)
    }

    const handleSave = () => {
        setEditing(false)
        user.setUser({
            name: nameLoc,
            title: titleLoc,
            password : user.password
        })
    }

    return (

        <Container>
            <Row>
                <Col md={4}>
                    {isEditing
                        ? (<ImageUploader/>)
                        : <div><Image className='image-2' width={204} height={300} src={adD.img}/></div>}

                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">

                        <br/>
                        <div className="forPersonal">
                            <h2>Название: </h2>
                            {isEditing
                                ? (<input className = "personalInput"
                                          type="text"
                                          value={ad.name}
                                          onChange={(event) => setName(event.target.value)}/>)
                                : (<div>{ad.name}</div>)}
                        </div>
                        <div className="forPersonal">
                            Описание:
                            {isEditing
                                ? (<input className = "personalInput"
                                          type="text"
                                          value={ad.title}
                                          onChange={(event) => setTitle(event.target.value)}/>)
                                : (<div>{ad.title}</div>)}
                        </div>


                    </Row>
                </Col>
                <Col md={4}>
                    <br/>
                    <Button variant={"outline-dark"} onClick={() => navigate(SELLER)}>Продавец</Button>

                    <div >
                        {isEditing ? (<button className="image-button2" onClick={handleSave}>
                                <div style={{ backgroundImage: `url(${component6})` }}></div>
                            </button>)
                            :
                            (<button className="image-button2" onClick={handleEditing}>
                                <div style={{ backgroundImage: `url(${component6})` }}></div>
                            </button>)}
                    </div>
                    <br/>
                    {isEditing
                        ? <Ra/>
                        : <div>Категория: {adD.category}</div>}

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

                <h1>Характеристики</h1>
                {description.map((info, index) =>
                    <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                        {info.title}: {info.description}
                    </Row>
                )}

            </Row>

        </Container>
    );
};

export default AdPage;

/*
    Что сделать:
        не забыть про id
        br заменить на отступ сверху

 */
/*
vlad:
<label className="personalButton">
                        {isEditing ? (<Button variant="outline-success" onClick={handleSave}>Сохранить</Button>) : (<Button variant="outline-success" onClick={handleEditing}>Редактировать</Button>)}
                    </label>

mine:
<button className="image-button2" onClick={handleSaveClick}>
                        <div style={{ backgroundImage: `url(${component6})` }}></div>
                    </button>

<Image width={300} height={400} src = {adD.img}/>

<h2>{adD.name}</h2>
                        <h6>just text without thoughts ***</h6>
 */