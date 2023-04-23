import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, Form, Image, Row} from "react-bootstrap";
import ImageUploader from "../dasha/ImageUploader.js";
import {PROFILE_PAGE, SHOP_PAGE} from "../utils/consts";
import {useNavigate} from "react-router-dom";
import {Context} from "../index";
import {useParams} from 'react-router-dom';
import component6 from "../dasha/Component6.png";
import CategoryDownFall from "../dasha/CategoryDownFall";
import {deleteAd, getAllAds, getOneAd, getPrice, updateAd} from "../http/adApi";
import {getInfo} from "../http/infoApi"
import {getUser} from "../http/userApi";
import {getAllComments} from "../http/commentApi";
import Carousel from 'react-bootstrap/Carousel';
import {observer} from "mobx-react-lite";
import '../dasha/ImageUploader.css'
import {getCategoryRoute} from "../http/categoryApi";


const Ad = observer(() => {
    const navigate = useNavigate()
    const {user} = useContext(Context)
    const {ad} = useContext(Context) // общее состояние

    const [adState, setAdState] = useState({info: []}) // объявление внутри страницы
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
    const [categoryRoute, setCategoryRoute] = useState(null)

    const [usersComments, setUsersComments] = useState([])

    const params = useParams()
    const id = parseInt(params.id)

    const fetchData = async () => {
        await Promise.resolve(getOneAd(id)).then(data => {
            if (data) {
                setAdState(data)
            } else {
                navigate(SHOP_PAGE)
            }
        })
        await Promise.resolve(getInfo(id)).then(data => setDescription(data))
        await Promise.resolve(getAllComments(id)).then(data => setComments(data.rows))
    }

    useEffect(() => {
        fetchData()
    }, []);

    useEffect(() => {
        if (adState.priceId) {
            getPrice(adState.priceId).then(data => setPrice(data))
        }
        if (adState.subSubCategoryId) {
            getCategoryRoute(adState.subSubCategoryId).then(data => setCategoryRoute(data))
        }
        if (adState.image) {
            setImages(adState.image)
        }
    }, [adState.priceId, adState.subSubCategoryId, adState.image])

    useEffect(() => {
        if (comments) {
            Promise.allSettled(comments.map(comment => getUser(comment.userId))).then(data => setUsersComments(data))
        }
    }, [comments])

    const getUserForComment = (id) => {
        const found = usersComments.find(user => user.value.id === id)
        return found.value
    }

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
        await Promise.resolve(deleteAd(adState.id)).then(() => {
            getAllAds(null, null, null, 30, 1).then(data => ad.setAds(data.rows))
        }).then(() => navigate(SHOP_PAGE))
    }

    const addAd = async () => {
        const formData = new FormData()
        formData.append('name', newName)

        adState.setAds(formData)
        await Promise.resolve(updateAd(adState.id, formData))
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
                                                // className='image-2'
                                                width={400}
                                                height={300}
                                                src={process.env.REACT_APP_API_URL + i.image}
                                            />
                                        </Carousel.Item>
                                    ))}
                                </Carousel>)
                            : <div>Загрузка картинок</div>
                        )
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
                                <h2><div>{adState.name}</div> </h2>}

                        </div>
                        <div className="forPersonal">
                            <br/>

                            <h4>Описание: </h4>
                            {isEditing
                                ? (<input className = "personalInput"
                                          type="text"
                                          value={adState.title}
                                          onChange={(event) => setTitle(event.target.value)}/>)
                                :
                                <h4><div> {adState.description}</div></h4>}

                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <br/>
                    <Button variant={"outline-dark"} onClick={() => navigate(PROFILE_PAGE + '/' + adState.userId)}>Продавец</Button>
                    {(user.isAuth && adState.userId === user.user.id || user.user.role === "ADMIN" || user.user.role === "MODERATOR") ?
                        <>
                            <div>
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
                        : (categoryRoute ? (
                            <Form>
                                <div>Категория: {categoryRoute.category.name}</div>
                                <div>Подкатегория: {categoryRoute.subCategory.name}</div>
                                <div>Подподкатегория: {categoryRoute.subSubCategory.name}</div>
                            </Form>
                        )
                        : <p>Загружаем категории...</p>)
                    }

                    <div>Адрес: {adState.address}</div>

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


                    {adState.status === 1 && (
                        <div>
                            <div>Статус: Открыто</div>
                        </div>
                    )}
                    {adState.status === 2 && (
                        <div>
                            <div>Статус: Забронировано</div>
                        </div>
                    )}
                    {adState.status === 3 && (
                        <div>
                            <div>Статус: Закрыто</div>
                        </div>
                    )}
                    <br/>
                    {(user.isAuth && adState.userId === user.user.id || user.user.role === "ADMIN" || user.user.role === "MODERATOR") ?
                        <Button variant={"outline-dark"} onClick={handleDelete}>Удалить объявление</Button>
                        : null
                    }

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
                    ? (comments ?
                        <div>
                            <ul>
                                {comments.map((comment) => (
                                    <li key={comment.id}>
                                        <strong>{getUserForComment(comment.userId).username}</strong> {comment.text}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    : <p>Загрузка комментариев...</p>
                    )

                    : <div><Button variant={"outline-dark"} onClick={() => setShowComments(true)}>Отобразить комментарии</Button>
                    </div>}

            </Row>

        </Container>
    );

});

export default Ad;