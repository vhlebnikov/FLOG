import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, Form, Image, Row} from "react-bootstrap";
import ImageUploader from "../dasha/ImageUploader.js";
import {AD_PAGE, PROFILE_PAGE, SHOP_PAGE} from "../utils/consts";
import {useNavigate} from "react-router-dom";
import {Context} from "../index";
import {useParams} from 'react-router-dom';
import component6 from "../dasha/Component6.png";
import CategoryDownFall from "../dasha/CategoryDownFall";
import {deleteAd, getOneAd, getPrice, updateAd} from "../http/adApi";
import {getInfo} from "../http/infoApi"
import {getUser} from "../http/userApi";
import {getAllComments} from "../http/commentApi";
import Carousel from 'react-bootstrap/Carousel';


const Ad = () => {
    const navigate = useNavigate()
    const {user} = useContext(Context)
    const {ads} = useContext(Context)

    const [ad, setAd] = useState({info: []})
    const [description, setDescription] = useState([])
    const [price, setPrice] = useState(0)
    const [images, setImages] = useState([])

    const [showComments, setShowComments] = useState(false)
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState("")

    const [nameLoc, setName] = useState('')
    const [titleLoc, setTitle] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [isEditing, setEditing] = useState(false)
    const [newName, setNewName] = useState('')

    const params = useParams()
    const id = parseInt(params.id)
    const userId = getUser(id)
    //const price = getPrice(id);

    const fetchData = async () => {
        await Promise.resolve(getOneAd(id)).then(data => setAd(data))
        await Promise.resolve(getInfo(id)).then(data => setDescription(data))
        await Promise.resolve(getAllComments(id)).then(data => setComments(data))
    }

    useEffect(() => {
        fetchData()
    }, []);

    useEffect(() => {
        if (ad.priceId) {
            getPrice(ad.priceId).then(data => setPrice(data))
        }
    }, [ad.priceId])

    useEffect(() => {
        if (ad.image) {
            setImages(ad.image)
        }
    }, [ad.image])

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

    const handleDelete = async () => {
        await Promise.resolve(deleteAd(ad.id)).then(navigate(SHOP_PAGE)) // тут оно не успевает удаляться и отображается на главной странице
    }

    const addAd = async () => {
        const formData = new FormData()
        formData.append('name', newName)

        ad.setAds(formData)
        await Promise.resolve(updateAd(ad.id, formData))
    }

    return (

        <Container>
            <Row>
                <Col md={4}>
                    {isEditing
                        ? (<ImageUploader/>)
                        :
                        (images.length !== 0
                            ? (<Carousel slide={false} interval={null}>
                                    {images.map(i => (
                                        <Carousel.Item key={i.id}>
                                            <img
                                                className='image-2'
                                                width={400}
                                                height={300}
                                                src={process.env.REACT_APP_API_URL + i.image}
                                            />
                                        </Carousel.Item>
                                    ))}
                                </Carousel>)
                            : <div>Загрузка картинок</div>
                        )
                        // <div><Image className='image-2' width={280 } height={200} src={process.env.REACT_APP_API_URL + ad.image}/></div>
                    }
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