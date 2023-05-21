import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Form, Row, CardGroup, ButtonGroup} from "react-bootstrap";
import {NOT_FOUND_AD_PAGE, PROFILE_PAGE, SHOP_PAGE} from "../utils/consts";
import {Link, useNavigate} from "react-router-dom";
import {Context} from "../index";
import {useParams} from 'react-router-dom';
import component6 from "../dasha/Component6.png";
import component12 from "../dasha/Component12.png";
import {deleteAd, getAllAds, getOneAd, getPrice} from "../http/adApi";
import {getUser} from "../http/userApi";
import {addComment, deleteComment, getAllComments} from "../http/commentApi";
import Carousel from 'react-bootstrap/Carousel';
import {observer} from "mobx-react-lite";
import {getCategoryRoute} from "../http/categoryApi";
import Circle from "../dasha/Circle";
import CommentModal from "../dasha/CommentModal";
import VerEx from "verbal-expressions";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ImageModal from "../dasha/ImageModal";
import AdEditModal from "../dasha/AdEditModal";
import {Avatar} from "rsuite";


const Ad = observer(() => {
    const navigate = useNavigate()
    const {user} = useContext(Context) // user через которого мы сидим (это мы, мы - пользователь, мы используем сайт)3
    const {ad} = useContext(Context) // общее состояние

    // владелец объявления
    const [userLoc, setUserLoc] = useState(null)

    // объявление внутри страницы его будем выводить
    const [adState, setAdState] = useState({info: []})

    // ========= локально меняем их и посылаем их в запросах =====
    const [info, setInfo] = useState([])
    const [image, setImage] = useState([])

    // Вот этих мужиков отдельно получаем и выводим
    const [price, setPrice] = useState(null)
    const [categoryRoute, setCategoryRoute] = useState(null)

    // а их меняем и отправляем в запросы
    const [priceLoc, setPriceLoc] = useState(null)
    const [categoryRouteLoc, setCategoryRouteLoc] = useState(null)
    // ============================================================

    const [showComments, setShowComments] = useState(false)
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState("")
    const [newCommentError, setNewCommentError] = useState(" ")

    const [showModal, setShowModal] = useState(false)

    const [showAdEditModal, setShowAdEditModal] = useState(false)

    const [showImageModal, setShowImageModal] = useState(false)
    const [selectedImage, setSelectedImage] = useState();
    const [selectedImageId, setSelectedImageId] = useState();


    const params = useParams()
    const id = parseInt(params.id)

    const notEmptyRegExp = VerEx().startOfLine().something().endOfLine()
    const isEmpty = (word) => {
        const ans = !notEmptyRegExp.test(word)
        notEmptyRegExp.lastIndex = 0
        return ans
    }

    const fetchData = async () => {
        await Promise.resolve(getOneAd(id)).then(data => {
            if (data) {
                setAdState(data)
            } else {
                navigate(NOT_FOUND_AD_PAGE)
            }
        })

        await Promise.resolve(getAllComments(id)).then(data => setComments(data))
    }

    useEffect(() => {
        fetchData()
    }, []);

    useEffect(() => {

        if (adState.info) {
            setInfo(adState.info)
        }
        if (adState.image) {
            setImage(adState.image)
        }

        if (adState.priceId) {
            getPrice(adState.priceId).then(data => setPrice(data))
        }
        if (adState.subSubCategoryId) {
            getCategoryRoute(adState.subSubCategoryId).then(data => setCategoryRoute(data))
        }
        if (adState.userId) {
            getUser(adState.userId).then(data => setUserLoc(data))
        }
    },
        [adState.name, adState.description, adState.address, adState.status,
            adState.info, adState.image, adState.priceId, adState.subSubCategoryId, adState.userId])

    useEffect(() => {
        if (price) {
            setPriceLoc(price)
        }
        if (categoryRoute) {
            setCategoryRouteLoc(categoryRoute)
        }
    }, [price, categoryRoute])

    const checkUser = () => {
        if (!userLoc) {
            return false
        }
        return userLoc.id === user.user.id || user.user.role === 'ADMIN' || user.user.role === 'MODERATOR'
    }

    const checkCommentAccess = (comment) => {
        return comment.userId === user.user.id || user.user.role === 'ADMIN' || user.user.role === 'MODERATOR'
    }




    const handleDelete = async () => {
        await Promise.resolve(deleteAd(adState.id)).then(() => {
            getAllAds(null, null, null, 30, 1).then(data => ad.setAds(data.rows))
        }).then(() => navigate(SHOP_PAGE))
    }



    const handleComment = (e) => {
        setNewComment(e.target.value)
        if (isEmpty(e.target.value)) {
            setNewCommentError("Пожалуйста введите комментарий")
        } else {
            setNewCommentError(null)
        }
    }

    const handleCommentAdd = () => {
        if (!user.isAuth) {
            setShowModal(true)
            return
        }
        addComment(id, newComment).then(data => setComments(data)).catch(e => alert(e.response.data.message))
        setNewComment("")
    }

    const handleCommentDelete = async (commentId) => {
        await Promise.resolve(deleteComment(commentId)
            .then(data => setComments(data)).catch(() => alert("Произошла ошибка, пожалуйста перезагрузить страницы")))
    }

    const handleShowComments = () => {
        if (showComments) {
            setShowComments(false)
        } else {
            setShowComments(true)
        }
    }

    const getNextStatus = (status) => {
        switch (status) {
            case 1:
                return 2;
            case 2:
                return 3;
            case 3:
                return 1;
            default:
                return status;
        }
    };
    const getStatusText = (status) => {
        switch (status) {
            case 1:
                return "Открыто";
            case 2:
                return "Забронировано";
            case 3:
                return "Закрыто";
            default:
                return "";
        }
    };

    //отображение картинки в модальном окне
    const handleImageClick = (image, id) => {
        setShowImageModal(true);
        setSelectedImage(image);
        setSelectedImageId(id)
    }




    return (
        <Container>
            <Row>
                {categoryRoute ? (
                        <Form>
                            <div style={{ marginLeft: '10px', marginTop: '10px' }}>
                                <Breadcrumb>
                                    <Breadcrumb.Item href="#" onClick={() => navigate(SHOP_PAGE)}>
                                        {categoryRoute.category.name}
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item href="#" onClick={() => navigate(SHOP_PAGE)}>
                                        {categoryRoute.subCategory.name}
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item href="#" onClick={() => navigate(SHOP_PAGE)}>
                                        {categoryRoute.subSubCategory.name}
                                    </Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                        </Form>
                    )
                    :
                    <div className="spinner-border" role="status">
                        <span className="sr-only"/>
                    </div>
                }
            </Row>

            <Row>
                {/*Название*/}
                <div className="forPersonal">
                    <div style={{display: 'flex', alignItems: 'center', marginTop: "20px"}}>
                            <h1 style={{ fontFamily: 'Century Gothic', fontWeight: 500, fontSize: 40}}> {adState.name}</h1>
                    </div>

                </div>

            </Row>

            <Row>
                {/*Картииинки!*/}
                <Col md={4}>
                    {adState.image ?
                        <Carousel slide={false} interval={null}>
                            {adState.image.map((i, index) => (
                                <Carousel.Item key={i.id}>
                                    <img
                                        className='bord'
                                        width={400}
                                        height={300}
                                        src={process.env.REACT_APP_API_URL + i.image}
                                        alt={"Фото загружается"}
                                        onClick={() => handleImageClick(i.image, index + 1)}
                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                        :
                        <div className="spinner-border" role="status">
                            <span className="sr-only"/>
                        </div>
                    }
                    <ImageModal
                        show={showImageModal}
                        handleClose={() => setShowImageModal(false)}
                        title={selectedImageId}
                        src={selectedImage}
                    />
                </Col>

                {/*Описание*/}
                <Col md={5}>
                    <Row className="d-flex flex-column align-items-center">
                        <div className="forPersonal" style={{ wordBreak: 'break-word' }}>
                            <h4 style={{ fontFamily: 'Century Gothic', fontWeight: 400, fontSize: 20}}>Описание: </h4>
                            <h4 style={{ fontFamily: 'Century Gothic', fontWeight: 400, fontSize: 20}}><div> {adState.description}</div></h4>
                        </div>

                    </Row>
                </Col>

                <Col md={3}>

                    {/*Профиль*/}
                    {userLoc ?
                        <Card className="shadow-box" border={"light"}>
                            <div>
                                {userLoc.image ?
                                    <Card.Img
                                        style={{ width: '60px', height: '60px',  display: 'block',
                                            margin: 'auto' }}
                                        variant="top"
                                        src={process.env.REACT_APP_API_URL + userLoc.image}
                                        alt="Profile Image"
                                    />

                                    :
                                    null
                                }
                                <CardGroup onClick={() => navigate(PROFILE_PAGE + '/' + userLoc.id)}>
                                    <h2 style={{ fontFamily: 'Century Gothic', fontWeight: 500, fontSize: 35, marginLeft: 15}}>{userLoc.username}</h2>
                                </CardGroup>
                            </div>

                            <Card.Body>
                                <Card.Text>{userLoc.email}</Card.Text>

                                <Card.Text>Адрес: {adState.address}</Card.Text>

                                <CardGroup>
                                    {price ?
                                        (
                                            <div>
                                                {price.type === 0 && (
                                                    <p>Без цены</p>
                                                )}
                                                {price.type === 1 && (
                                                    <p>Цена: {price.start}</p>
                                                )}
                                                {price.type === 2 && (
                                                    <p>Цена: {price.start} - {price.end}</p>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="spinner-border" role="status">
                                                <span className="sr-only"/>
                                            </div>
                                        )}
                                </CardGroup>

                                <CardGroup>
                                    <div>Статус: {getStatusText(adState.status)}</div>
                                </CardGroup>
                            </Card.Body>
                        </Card>
                        : null}
                </Col>
                <Col md={1}>
                    {/*Кнопочки*/}
                    {checkUser() ?
                        <div>
                            <ButtonGroup vertical className="image-button2">
                                <Button
                                    title="Редактировать объявление"
                                    className="image-button2"
                                    src={id}
                                    alt={"Фото загружается"}
                                    onClick={() => setShowAdEditModal(true)}
                                >
                                    <div style={{ backgroundImage: `url(${component6})` }}></div>
                                </Button>
                                <Button
                                    title="Удалить объявление"
                                    className="image-button2"
                                    onClick={handleDelete}
                                >
                                    <div style={{ backgroundImage: `url(${component12})` }}></div>
                                </Button>
                            </ButtonGroup>
                            <div>
                                <AdEditModal
                                    show={showAdEditModal}
                                    handleClose={() => setShowAdEditModal(false)}
                                />
                            </div>
                        </div>

                        :
                        <div></div>
                    }
                </Col>
            </Row>

            {/*Характеристики*/}
            <Row className="d-flex flex-column m-3">

                <h1 style={{fontFamily: 'Century Gothic', fontWeight: 500, fontSize: 40}}>Характеристики</h1>
                {info && info.map((i, index) =>
                    <Row key={i.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                        {i.name}: {i.description}
                    </Row>
                )}

            </Row>



            {/*Комменты*/}
            <Row className="d-flex flex-column m-3">

                <h1 style={{ fontFamily: 'Century Gothic', fontWeight: 500, fontSize: 40}}>Комментарии</h1>
                <Button variant={"outline-dark"} onClick={handleShowComments}>{showComments ? "Скрыть комментарии" : "Показать комментарии"}</Button>

                {showComments ? (
                    <div>
                        {comments ? (
                            <div>

                                <ul>
                                    {comments.map((comment) => (
                                        <li key={comment.id} style={{ marginTop:  '10px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <Circle color="#008037" letters={comment.user.username.charAt(0)} />
                                                <strong>
                                                    <h4 style={{ marginLeft: '10px', marginRight: '10px' }}>

                                                        <Link to={PROFILE_PAGE + '/' + comment.userId} style={{ color: '#575757' }}>
                                                            {comment.user.username}
                                                        </Link>
                                                    </h4>
                                                </strong>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <h6 style={{ marginLeft: '10px'}}>{comment.text}</h6>
                                                {checkCommentAccess(comment) ?
                                                    <Button variant={"outline-dark"} style={{marginLeft: 'auto'}} onClick={() => handleCommentDelete(comment.id)}>Удалить комментарий</Button>
                                                    : null
                                                }

                                            </div>

                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <div className="spinner-border" role="status">
                                <span className="sr-only"/>
                            </div>                        )}
                        <Form>
                            <Form.Group>
                                <Form.Control
                                    value={newComment}
                                    onChange={handleComment}
                                    className="mt-3"
                                    placeholder="Оставьте свой комментарий здесь"
                                />
                                {newCommentError ? <Form.Label style={{color: 'red'}}>{newCommentError}</Form.Label> : null}
                            </Form.Group>
                            <Button
                                className="mt-3"
                                variant="outline-success btn-expensive"
                                disabled={!!newCommentError}
                                onClick={handleCommentAdd}
                            >
                                Добавить
                            </Button>
                            <CommentModal
                                show={showModal}
                                handleClose={() => setShowModal(false)}
                                title="Войдите, чтобы оставить комментарий"
                                body="Вы должны быть авторизованы, чтобы оставлять комментарии"
                            />
                        </Form>
                    </div>
                ) : null}
            </Row>
        </Container>
    );
});

export default Ad;