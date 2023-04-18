import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Form, Image, Nav, Row} from "react-bootstrap";
import ImageUploader2 from "../dasha/ImageUploader.css";
import ImageUploader from "../dasha/ImageUploader.js";
import photo from "../dasha/photo.png"
import {AUTH_PAGE, CREATE_AD_PAGE, PROFILE_PAGE, SHOP_PAGE} from "../utils/consts";
import {useLocation, useNavigate} from "react-router-dom";
import {Context} from "../index";
import {useParams} from 'react-router-dom';
import AdStore from '../store/AdStore.js'

import component6 from "../dasha/Component6.png";
import CategoryDownFall from "../dasha/CategoryDownFall";
import {createAd, deleteAd, getOneAd, getPrice, updateAd} from "../http/adApi";
import {getInfo} from "../http/infoApi"
import {getUser} from "../http/userApi";
import Comments from "../dasha/Comments";
import {getAllComments} from "../http/commentApi";


const Ad = () => {
    //const ad = {id: 1, name: "First and Cool", price: 1000, category: 'mhe', img: photo}
    const [ad, setAd] = useState({info: []});
    const [description, setDescription] = useState([]);
    const [price, setPrice] = useState(0);

    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    const params = useParams();
    console.log(params);
    const id = parseInt(params.id);
    const userId = getUser(id);
    //const price = getPrice(id);
    console.log(id)


    useEffect(() => {
        getOneAd(id).then(data => setAd(data))
        getInfo(id).then(data => setDescription(data))
        getAllComments().then(data => setComments(data))
    }, []);

    useEffect(() => {
        if (ad.priceId) {
            getPrice(ad.priceId).then(data => setPrice(data));
        }
    }, [ad.priceId]);

    console.log(comments)
    console.log(description)
    console.log(ad)






    const [nameLoc, setName] = useState('')
    const [titleLoc, setTitle] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isEditing, setEditing] = useState(false);


    const navigate = useNavigate();
    const {user} = useContext(Context);
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

    const handleDelete = () => {
        deleteAd(ad.id);
        navigate(SHOP_PAGE);
    };


    const [newName, setNewName] = useState('')

    const addAd = () => {
        const formData = new FormData()
        formData.append('name', newName)

        //ad.setAds(formData)
        updateAd(ad.id, formData)
    }



    return (

        <Container>
            <Row>
                <Col md={4}>
                    {isEditing
                        ? (<ImageUploader/>)
                        : <div><Image className='image-2' width={280 } height={200} src={process.env.REACT_APP_API_URL + ad.image}/></div>}
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">

                        <br/>

                        <div className="forPersonal">
                            <h2>Название: </h2>
                            {isEditing
                                ?
                                (<Form.Control value={newName} onChange={e => setNewName(e.target.value)} className="mt-3" placeholder="name"/>)

                                :
                            <h2><div>{ad.name}</div> </h2>}

                        </div>
                        <div className="forPersonal">
                            <br/>

                                <h4>Описание: </h4>
                                {isEditing
                                    ? (<input className = "personalInput"
                                              type="text"
                                              value={ad.title}
                                              onChange={(event) => setTitle(event.target.value)}/>)
                                    :
                                    <h4><div> {ad.description}</div></h4>}

                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <br/>
                    <Button variant={"outline-dark"} onClick={() => navigate(PROFILE_PAGE)}>Продавец</Button>
                    {user.isAuth ?
                        <>
                            <div >
                                {isEditing ? (<button title="Выйти из сохранения" className="image-button2" onClick={handleSave}>
                                        <div style={{ backgroundImage: `url(${component6})` }}></div>
                                    </button>)
                                    :
                                    (<button title="Редактировать объявление" className="image-button2" onClick={handleEditing}>
                                        <div style={{ backgroundImage: `url(${component6})` }}></div>
                                    </button>)}
                            </div>
                        </>
                        :
                        <div></div>

                    }
                    <div >

                    </div>
                    <br/>
                    {isEditing
                        ? <CategoryDownFall/>
                        : <div>Категория: {ad.subSubCategoryId}</div>}
                    <div>Адрес: {ad.address}</div>

                    {price ?
                        (
                            <div>
                                {price.type === 0 && (
                                    <div>
                                        <div>Без цены</div>
                                    </div>
                                )}
                                {price.type === 1 && (
                                    <div>
                                        <div>Цена: {price.start}</div>
                                    </div>
                                )}
                                {price.type === 2 && (
                                    <div>
                                        <div>Цена: {price.start} - {price.end}</div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <p>Загружаем цену...</p>
                        )}


                    {ad.status === 1 && (
                        <div>
                            <div>Статус: Открыто</div>
                        </div>
                    )}
                    {ad.status === 2 && (
                        <div>
                            <div>Статус: Забронировано</div>
                        </div>
                    )}
                    {ad.status === 3 && (
                    <div>
                        <div>Статус: Закрыто</div>
                    </div>
                    )}
                    <br/>

                    <Button variant={"outline-dark"} onClick={handleDelete}>Удалить объявление</Button>
                    {isEditing
                        ? <Button variant={"outline-dark"} onClick={addAd}>Сохранить изменения</Button>
                        : null
                        }

                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>

                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">

                <h1>Характеристики</h1>
                <br/>
                {description.map((info, index) =>
                    <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                        {info.name}: {info.description}
                    </Row>
                )}

            </Row>
            <Row className="d-flex flex-column m-3">


                <h1>Комментарии</h1>
                {showComments
                    ?
                    <div>
                        <ul>
                            {comments.map((comment) => (
                                <li key={comment.id}>
                                    <strong>{comment.userId}:</strong> {comment.text}
                                </li>
                            ))}
                        </ul>
                    </div>

                    : <div><Button variant={"outline-dark"} onClick={() => setShowComments(true)}>Отобразить комментарии</Button>
                    </div>}

            </Row>

        </Container>
    );

};

export default Ad;

/*

(<input className = "personalInput"
                                          type="text"
                                          value={ad.name}
                                          onChange={(event) => setName(event.target.value)}/>)



<h1>Комментарии</h1>
                {showComments
                    ?  <Comments adId={ad.id} userId={userId} />
                    : <div><Button variant={"outline-dark"} onClick={() => setShowComments(true)}>Отобразить комментарии</Button>
                    </div>}



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

<div className="colored-block">
                        текст
                    </div>
 */
