import React, {useContext, useEffect, useState} from 'react';
import {
    Button,
    Card,
    Image,
    Col,
    Container,
    Form,
    Row,
    CardGroup,
    ButtonGroup,
    Breadcrumb,
    BreadcrumbItem, InputGroup, Toast, ToastContainer
} from "react-bootstrap";
import {NOT_FOUND_AD_PAGE, PROFILE_PAGE, SHOP_PAGE} from "../utils/consts";
import {Link, useNavigate} from "react-router-dom";
import {Context} from "../index";
import {useParams} from 'react-router-dom';
import component6 from "../assets/Component6.png";
import component12 from "../assets/Component12.png";
import {deleteAd, getAllAds, getOneAd, updateAd} from "../http/adApi";
import {getUser} from "../http/userApi";
import {addComment, deleteComment, getAllComments} from "../http/commentApi";
import Carousel from 'react-bootstrap/Carousel';
import {observer} from "mobx-react-lite";
import {getCategoryRoute} from "../http/categoryApi";
import Circle from "../dasha/Circle";
import CommentModal from "../dasha/CommentModal";
import VerEx from "verbal-expressions";
import ImageModal from "../dasha/ImageModal";
import AdEditModal from "../dasha/AdEditModal";
import frog from "../assets/FrogSmile.svg";

const Ad = observer(() => {
    const navigate = useNavigate()
    const {user} = useContext(Context) // user через которого мы сидим (это мы, мы - пользователь, мы используем сайт)3
    const {ad} = useContext(Context) // общее состояние
    const {filter} = useContext(Context)

    // владелец объявления
    const [userLoc, setUserLoc] = useState(null)

    // объявление внутри страницы его будем выводить
    const [adState, setAdState] = useState({info: []})

    // ошибки
    const [nameError, setNameError] = useState(null)
    const [descriptionError, setDescriptionError] = useState(null)
    const [addressError, setAddressError] = useState(null)
    const [infoError, setInfoError] = useState(null)
    const [imageError, setImageError] = useState(null)
    const [priceStartError, setPriceStartError] = useState(null)
    const [priceEndError, setPriceEndError] = useState(null)
    const [categoryError, setCategoryError] = useState(null)

    const [submit, setSubmit] = useState(false)

    // ========= локально меняем их и посылаем их в запросах =====
    const [name, setName] = useState(null)
    const [description, setDescription] = useState(null)
    const [address, setAddress] = useState(null)
    const [status, setStatus] = useState(null)

    const [info, setInfo] = useState([])
    const [image, setImage] = useState([])

    // Вот этих мужиков отдельно получаем и выводим
    const [categoryRoute, setCategoryRoute] = useState([])

    // а их меняем и отправляем в запросы
    const [priceLoc, setPriceLoc] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState(null)
    // ============================================================

    const [showComments, setShowComments] = useState(false)
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState("")
    const [newCommentError, setNewCommentError] = useState(null)

    const [showCommentModal, setShowCommentModal] = useState(false)

    const [showImageModal, setShowImageModal] = useState(false)
    const [selectedImage, setSelectedImage] = useState();
    const [selectedImageId, setSelectedImageId] = useState();

    const [showAdEditModal, setShowAdEditModal] = useState(false)

    const params = useParams()
    const id = parseInt(params.id)

    const notEmptyRegExp = VerEx().startOfLine().something().endOfLine()
    const isEmpty = (word) => {
        const ans = !notEmptyRegExp.test(word)
        notEmptyRegExp.lastIndex = 0
        return ans
    }

    const fetchData = () => {
        Promise.resolve(getOneAd(id)).then(data => {
            if (data) {
                setAdState(data)
            } else {
                navigate(NOT_FOUND_AD_PAGE)
            }
        })

        Promise.resolve(getAllComments(id)).then(data => setComments(data))
    }

    useEffect(() => {
        fetchData()
    }, []);

    useEffect(() => {
            if (adState.name) {
                setName(adState.name)
            }
            if (adState.description) {
                setDescription(adState.description)
            }
            if (adState.address) {
                setAddress(adState.address)
            }
            if (adState.status) {
                setStatus(adState.status)
            }
            if (adState.info) {
                setInfo(adState.info)
            }
            if (adState.image) {
                setImage(adState.image)
            }

            if (adState.price) {
                setPriceLoc(adState.price)
            }
            if (adState.categoryId) {
                setSelectedCategory(adState.categoryId)
                getCategoryRoute(adState.categoryId).then(data => setCategoryRoute(data))
            }
            if (adState.userId) {
                getUser(adState.userId).then(data => setUserLoc(data))
            }
        },
        [adState.name, adState.description, adState.address, adState.status,
            adState.info, adState.image, adState.price, adState.categoryId, adState.userId])

    const checkUser = () => {
        if (!userLoc) {
            return false
        }
        return userLoc.id === user.user.id || user.user.role === 'ADMIN' || user.user.role === 'MODERATOR'
    }

    const checkCommentAccess = (comment) => {
        return comment.userId === user.user.id || user.user.role === 'ADMIN' || user.user.role === 'MODERATOR'
    }

    const nameHandler = (e) => {
        setName(e.target.value)
        if (isEmpty(e.target.value)) {
            setNameError("Введите название")
        } else {
            setNameError(null)
        }
    }

    const descriptionHandler = (e) => {
        setDescription(e.target.value)
        if (isEmpty(e.target.value)) {
            setDescriptionError("Введите описание")
        } else {
            setDescriptionError(null)
        }
    }

    const addressHandler = (e) => {
        setAddress(e.target.value)
        if (isEmpty(e.target.value)) {
            setAddressError("Введите адрес")
        } else {
            setAddressError(null)
        }
    }

    const statusHandler = () => {
        setStatus(getNextStatus(status))
    }

    const imageHandler = (e) => {
        setImage(Array.from(e.target.files))
        setImageError(null)
    }

    const addInfo = () => {
        setInfo([...info, {name: '', description: '', id: Date.now()}])
    }
    const removeInfo = (id) => {
        setInfoError(null)
        setInfo(info.filter(i => i.id !== id))
    }
    const changeInfo = (key, value, id) => {
        setInfoError(null)
        setInfo(info.map(i => i.id === id ? {...i, [key]: value} : i))
    }

    const priceLocHandler = (key, e) => {
        if (key === 'type') {
            setPriceLoc({...priceLoc, [key]: e})
        } else {
            if (isNaN(e.target.value) || e.target.value < 0) {
                if (key === 'start') {
                    setPriceStartError("Цена - положительное число")
                }
                if (key === 'end') {
                    setPriceEndError("Цена - положительное число")
                }
                return
            } else if (isEmpty(e.target.value)) {
                if (key === 'start') {
                    setPriceStartError("Введите цену")
                }
                if (key === 'end') {
                    setPriceEndError("Введите цену")
                }
            } else {
                if (key === 'start') {
                    setPriceStartError(null)
                }
                if (key === 'end') {
                    setPriceEndError(null)
                }
            }
            setPriceLoc({...priceLoc, [key]: e.target.value})
        }
    }

    const handleDelete = async () => {
        await Promise.resolve(deleteAd(adState.id)).then(() => {
            getAllAds(filter.category, null, null, null, 30, 1).then(data => ad.setAds(data.rows))
        }).then(() => navigate(SHOP_PAGE))
    }

    const checkFields = async () => {
        let flag = true

        if (!selectedCategory) {
            await setCategoryError("Выберите категорию")
            flag = false
        }

        if (info.filter(i => isEmpty(i.name) || isEmpty(i.description)).length) {
            await setInfoError("Характеристики не могут быть пустыми")
            flag = false
        }

        if (isEmpty(name)) {
            await setNameError("Введите название")
            flag = false
        }

        if (isEmpty(description)) {
            await setDescriptionError("Введите описание")
            flag = false
        }

        if (isEmpty(address)) {
            await setAddressError("Введите адрес")
            flag = false
        }

        if ((priceLoc.type === 1 || priceLoc.type === 2) && isEmpty(priceLoc.start)) {
            await setPriceStartError("Введите цену")
            flag = false
        }

        if (priceLoc.type === 2) {
            if (isEmpty(priceLoc.end)) {
                await setPriceEndError("Введите цену")
                flag = false
            } else if (!isEmpty(priceLoc.start) && priceLoc.end < priceLoc.start) {
                await setPriceEndError("Конечная цена не может быть ниже начальной")
                flag = false
            }
        }

        return flag
    }

    const adUpdate = () => {
        setInfoError(null)

        if (name || description || address || status || priceLoc || info || image) {
            const formData = new FormData()

            if (name && name !== adState.name) {
                formData.append('name', name)
            }
            if (description && description !== adState.description) {
                formData.append('description', description)
            }
            if (address && address !== adState.address) {
                formData.append('address', address)
            }
            if (status && status !== adState.status) {
                formData.append('status', status)
            }
            if (selectedCategory) {
                formData.append('categoryId', selectedCategory)
            }
            if (priceLoc) {
                formData.append('price', JSON.stringify(priceLoc))
            }
            if (image) {
                for (const i of image) {
                    formData.append('image', i)
                }
            }
            if (info) {
                formData.append('info', JSON.stringify(info))
            }
            updateAd(id, formData).then(data => setAdState(data))
                .catch(e => setImageError(e.response.data.message))
        }
    }

    const handleComment = (e) => {
        setNewComment(e.target.value)
        if (isEmpty(e.target.value)) {
            setNewCommentError("Пожалуйста введите комментарий")
        } else {
            setNewCommentError(null)
        }
    }

    const handleCommentAdd = (e) => {
        e.preventDefault()
        if (!user.isAuth) {
            setShowCommentModal(true)
            return
        }
        if (isEmpty(newComment)) {
            setNewCommentError("Пожалуйста введите комментарий")
            return
        }
        addComment(id, newComment).then(data => setComments(data)).catch(e => alert(e.response.data.message))
        setNewComment("")
    }

    const handleCommentDelete = (commentId) => {
        deleteComment(commentId).then(data => setComments(data))
            .catch(() => alert("Произошла ошибка при удалении комментария, пожалуйста перезагрузите страницу"))
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

    const handleImageClick = (image, id) => {
        setShowImageModal(true);
        setSelectedImage(image);
        setSelectedImageId(id)
    }

    useEffect(() => {
        if (selectedCategory) {
            setCategoryError(null)
        }
    }, [selectedCategory])

    const setCategoryAndSearch = (id) => {
        filter.setCategory(id)
        navigate(SHOP_PAGE)
    }

    return (
        <Container>
            {/*Category Route*/}
            <Row>
                {categoryRoute ? (
                    <Form>
                        <div style={{marginLeft: '10px', marginTop: '10px'}}>
                            <Breadcrumb>
                                {categoryRoute.map(i => (
                                    <BreadcrumbItem key={i.id} onClick={() => setCategoryAndSearch(i.id)}>
                                        {i.name}
                                    </BreadcrumbItem>
                                ))}
                            </Breadcrumb>
                        </div>
                    </Form>
                ) : null}
            </Row>

            <Row>
                {/*Дата*/}
                {adState.createdAt ?
                    <div>
                        <h1 style={{fontFamily: 'Century Gothic', fontWeight: 500, fontSize: 15}}>
                            {(new Date(adState.createdAt)).toLocaleDateString('ru-RU') + " "}
                            {(new Date(adState.createdAt)).toLocaleTimeString('ru-RU', {
                                hour: 'numeric',
                                minute: 'numeric'
                            })}
                        </h1>
                    </div>
                    :
                    <div className="spinner-border" role="status">
                        <span className="sr-only"/>
                    </div>
                }

            </Row>

            <Row>
                {/*Название*/}
                <div >
                    <div style={{display: 'flex', alignItems: 'center', marginTop: "10px"}}>
                        <h1 style={{
                            color: '#133612',
                            fontFamily: 'Century Gothic',
                            fontWeight: 500,
                            fontSize: 40
                        }}> {adState.name}</h1>
                    </div>
                </div>

            </Row>

            <Row style={{
                marginTop: "1%",
                boxShadow: " 6px 6px 6px 6px rgba(0, 0, 0, .2)",
                paddingTop: "3%",
                paddingBottom: "3%"
            }}>
                {/*Картииинки!*/}
                <Col md={4}>
                    {adState.image ?
                        <Carousel slide={false} interval={null}>
                            {adState.image.map((i, index) => (
                                <Carousel.Item
                                    key={i.id}
                                    style={{width: "400px", height: "400px", overflow: "hidden", borderRadius: "10%"}}
                                >
                                    <div
                                        className="blur"
                                        style={{backgroundImage: `url(${process.env.REACT_APP_API_URL + i.image})`}}
                                    >
                                    </div>
                                    <Image
                                        fluid
                                        style={{width: "400px", height: "400px"}}
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
                        <div className="forPersonal" style={{wordBreak: 'break-word'}}>
                            <h4 style={{fontFamily: 'Century Gothic', fontWeight: 400, fontSize: 20}}>Описание: </h4>
                            <h3 style={{fontFamily: 'Century Gothic', fontWeight: 400, fontSize: 20}}>
                                <div> {adState.description}</div>
                            </h3>
                        </div>
                    </Row>
                </Col>

                <Col md={3}>
                    {/*Профиль*/}
                    {userLoc ?
                        <Card className="shadow-box" border={"light"}>
                            <div>
                                {userLoc.image ?
                                    <div style={{
                                        width: "60px",
                                        height: "60px",
                                        borderRadius: "50%",
                                        margin: "0 auto",
                                        overflow: "hidden"
                                    }}>
                                        <Card.Img
                                            className="perImage"
                                            variant="top"
                                            src={process.env.REACT_APP_API_URL + userLoc.image}
                                            alt="Profile Image"
                                        />
                                    </div>
                                    :
                                    null
                                }

                                <CardGroup onClick={() => navigate(PROFILE_PAGE + '/' + userLoc.id)}>
                                    <h2 style={{
                                        fontFamily: 'Century Gothic',
                                        fontWeight: 500,
                                        fontSize: 35,
                                        marginLeft: 15
                                    }}>
                                        {userLoc.username}
                                    </h2>
                                </CardGroup>
                            </div>
                            <Card.Body>
                                <Card.Text>{userLoc.email}</Card.Text>

                                <Card.Text>Адрес: {adState.address}</Card.Text>

                                <CardGroup>
                                    {adState.price ?
                                        (
                                            <div>
                                                {adState.price.type === 0 && (
                                                    <p>Без цены</p>
                                                )}
                                                {adState.price.type === 1 && (
                                                    <p>Цена: {adState.price.start} ₽</p>
                                                )}
                                                {adState.price.type === 2 && (
                                                    <p>Цена: {adState.price.start} - {adState.price.end} ₽</p>
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
                                    onClick={() => setShowAdEditModal(true)}
                                >
                                    <div style={{backgroundImage: `url(${component6})`}}></div>
                                </Button>
                                <Button
                                    title="Удалить объявление"
                                    className="image-button2"
                                    onClick={handleDelete}
                                >
                                    <div style={{backgroundImage: `url(${component12})`}}></div>
                                </Button>
                            </ButtonGroup>
                            <div>
                                <AdEditModal
                                    show={showAdEditModal}
                                    handleClose={() => setShowAdEditModal(false)}
                                    others={[name, nameHandler, description, descriptionHandler, address, addressHandler,
                                        status, getStatusText, statusHandler, imageHandler, priceLoc, priceLocHandler,
                                        addInfo, info, changeInfo, removeInfo, adUpdate, nameError, descriptionError,
                                        addressError, infoError, imageError, priceStartError, priceEndError, isEmpty, checkFields,
                                        categoryError, setCategoryError, selectedCategory, setSelectedCategory, categoryRoute]}
                                />
                            </div>
                        </div>
                        :
                        null
                    }
                </Col>
            </Row>

            {/*Характеристики*/}
            <Row className="d-flex flex-column m-3">

                <h1 style={{fontFamily: 'Century Gothic', fontWeight: 500, fontSize: 40}}>Характеристики</h1>
                {adState.info && adState.info.map((i, index) =>
                    <Row key={i.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                        <h5 style={{fontWeight: 'lighter'}}>{i.name} : {i.description} </h5>
                    </Row>
                )}

            </Row>

            {/*Комменты*/}
            <Row className="d-flex flex-column m-3">

                <h1 style={{fontFamily: 'Century Gothic', fontWeight: 500, fontSize: 40}}>Комментарии</h1>
                <Button variant={"outline-dark"}
                        onClick={handleShowComments}>{showComments ? "Скрыть комментарии" : "Показать комментарии"}</Button>

                {showComments ? (
                    <div>
                        {comments ? (
                            <div>
                                <ul>
                                    {comments.map((comment) => (
                                        <li key={comment.id} style={{marginTop: '10px'}}>
                                            <div style={{display: 'flex', alignItems: 'center'}}>
                                                <Circle color="#008037" letters={comment.user.username.charAt(0)}/>
                                                <strong>
                                                    <h4 style={{marginLeft: '10px', marginRight: '10px'}}>
                                                        <Link to={PROFILE_PAGE + '/' + comment.userId}
                                                              style={{color: '#575757'}}>
                                                            {comment.user.username}
                                                        </Link>
                                                    </h4>
                                                </strong>

                                                {comment.createdAt ?
                                                    <>
                                                        <h6 style={{
                                                            color: '#b7b5b5',
                                                            fontWeight: 'lighter'
                                                        }}>· {(new Date(comment.createdAt)).toLocaleDateString('ru-RU')}</h6>
                                                        <h6 style={{
                                                            color: '#b7b5b5',
                                                            marginLeft: 5,
                                                            fontWeight: 'lighter'
                                                        }}>{(new Date(comment.createdAt)).toLocaleTimeString('ru-RU')}</h6>
                                                    </>
                                                    :
                                                    <div className="spinner-border " role="status">
                                                        <span className="sr-only"/>
                                                    </div>
                                                }
                                            </div>
                                            <div style={{display: 'flex', alignItems: 'center'}}>
                                                <h6 style={{marginLeft: '10px'}}>{comment.text}</h6>
                                                {checkCommentAccess(comment) ?
                                                    <Button variant={"outline-dark"} style={{marginLeft: 'auto'}}
                                                            onClick={() => handleCommentDelete(comment.id)}>Удалить
                                                        комментарий</Button>
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
                            </div>
                        )}
                        <Form onSubmit={e => handleCommentAdd(e)}>
                            <InputGroup hasValidation>
                                <Form.Control
                                    required
                                    isInvalid={!!newCommentError}
                                    value={newComment}
                                    onChange={handleComment}
                                    className="mt-3"
                                    placeholder="Оставьте свой комментарий здесь"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {newCommentError}
                                </Form.Control.Feedback>
                                <Button
                                    className="mt-3"
                                    variant="outline-success btn-expensive"
                                    disabled={!!newCommentError}
                                    onClick={e => handleCommentAdd(e)}
                                >
                                    Добавить
                                </Button>
                            </InputGroup>
                            <CommentModal
                                show={showCommentModal}
                                handleClose={() => setShowCommentModal(false)}
                                title="Войдите, чтобы оставить комментарий"
                                body="Вы должны быть авторизованы, чтобы оставлять комментарии"
                            />
                        </Form>
                    </div>
                ) : null}
            </Row>

            <ToastContainer
                className="p-3"
                position={'bottom-end'}
            >
                <Toast
                    onClose={() => {
                        setImageError(null)
                        setImage([])
                    }}
                    show={!!imageError}
                    delay={3000}
                    autohide
                >
                    <Toast.Header>
                        <img
                            width={30}
                            height={30}
                            src={frog}
                            className="rounded me-2"
                            alt=""
                        />
                        <strong className="me-auto">FLOG</strong>
                    </Toast.Header>
                    <Toast.Body>
                        {imageError}
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </Container>
    );
});

export default Ad;