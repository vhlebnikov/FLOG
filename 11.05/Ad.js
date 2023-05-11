import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {AD_PAGE, NOT_FOUND_AD_PAGE, PROFILE_PAGE, SHOP_PAGE} from "../utils/consts";
import {Link, useNavigate} from "react-router-dom";
import {Context} from "../index";
import {useParams} from 'react-router-dom';
import component6 from "../dasha/Component6.png";
import component12 from "../dasha/Component12.png";
import CategoryDownFall from "../dasha/CategoryDownFall";
import {deleteAd, getAllAds, getOneAd, getPrice, updateAd} from "../http/adApi";
import {getInfo} from "../http/infoApi"
import {getUser} from "../http/userApi";
import {addComment, deleteComment, getAllComments} from "../http/commentApi";
import Carousel from 'react-bootstrap/Carousel';
import {observer} from "mobx-react-lite";
import '../dasha/ImageUploader.css'
import {getCategoryRoute} from "../http/categoryApi";
import Circle from "../dasha/Circle";
import CommentModal from "../dasha/CommentModal";




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




    const [categoryRoute, setCategoryRoute] = useState(null)

    const [usersComments, setUsersComments] = useState([])

    const params = useParams()
    const id = parseInt(params.id)

    const fetchData = async () => {
        await Promise.resolve(getOneAd(id)).then(data => {
            if (data) {
                setAdState(data)
                setAdLoc(data) //idk
            } else {
                navigate(NOT_FOUND_AD_PAGE) //заменить на дургую страницу
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
        if (adState.userId) {
            getUser(adState.userId).then(data => user.setUser(data))

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
    }

    const handleDelete = async () => {
        await Promise.resolve(deleteAd(adState.id)).then(() => {
            getAllAds(null, null, null, 30, 1).then(data => ad.setAds(data.rows))
        }).then(() => navigate(SHOP_PAGE))
    }


    const [adLoc, setAdLoc] = useState(undefined)

    useEffect(() => {
        if (adLoc) {
            setAdName(adLoc.name)
        }
    }, [adLoc])
    const [newName, setNewName] = useState(undefined)
    const [adName, setAdName] = useState(undefined)

    const [newDescription, setNewDescription] = useState(undefined)
    const adUpdate = () => {
        if ( newName || newDescription) {
            const formData = new FormData()

            if (newName && newName !== adName) {
                formData.append('username', newName)
            }
            if (newDescription) {
                formData.append('description', newDescription)
            }
            updateAd(id, formData).then(data => setAdLoc(data))
        }
    }
    const handleDeleteComment = (idComment) => {
        deleteComment(idComment)
            .then(() => {
                setComments(comments.filter((comment) => comment.id !== idComment));
            })
            .catch((error) => {
                console.error(`Error deleting comment with id :${idComment}: ${error}`);
            });
    }

    const commentAd = async (id, text) => {
        await Promise.resolve(addComment(id, text))
        const newComments = [...comments, { id: comments.length + 1, userId: user.user.id, text }];
        setComments(newComments);
        setNewComment('');

    };

    function handleSubmit() {
        if (!user.isAuth) {
            setShowModal(true);
        } else {
            if (newComment.trim() !== '')  {
                commentAd(id, newComment);
            }
        }
    }

    const [file, setNewFile] = useState(null)

    const selectNewFile = e => {
        setNewFile(Array.from(e.target.files))
    }


    const [showModal, setShowModal] = useState(false);


    const handleStatusChange = async (id) => {
        //await Promise.resolve(changeAdStatus(id, getNextStatus(adState.status)));
        setAdState({ ...adState, status: getNextStatus(adState.status) });
    };
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


    return (

        <Container>
            <Row>
                {isEditing
                    ? <CategoryDownFall/>
                    : (categoryRoute ? (
                            <Form>
                                <div style={{ marginLeft: '10px', marginTop: '10px' }}>{categoryRoute.category.name} / {categoryRoute.subCategory.name} / {categoryRoute.subSubCategory.name}</div>

                            </Form>
                        )
                        : <p>Загружаем категории...</p>)
                }
            </Row>
            <Row>
                    <div className="forPersonal">
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: "20px"  }}>

                        {isEditing
                            ?
                            (<Form.Control
                                className="mt-3"
                                type="text"
                                //placeholder="name"
                                value={newName}
                                onChange={(event) => setNewName(event.target.value)}

                            />)

                            :
                            <h1 style={{ fontFamily: 'Century Gothic', fontWeight: 500, fontSize: 40}}> {adState.name}</h1>}
                        </div>
                    </div>

            </Row>
            <Row>
                <Col md={4}>
                    {isEditing
                        ? (<Form.Control
                            className="mt-3"
                            type="file"
                            multiple
                            required
                            onChange={selectNewFile}
                        />)
                        :
                        (images.length !== 0
                            ? (<Carousel slide={false} interval={null}>
                                    {images.map(i => (
                                        <Carousel.Item key={i.id}>
                                            <img
                                                className='bord'
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
                <Col md={5}>
                    <Row className="d-flex flex-column align-items-center">


                        <div className="forPersonal" style={{ wordBreak: 'break-word' }}>

                            <h4 style={{ fontFamily: 'Century Gothic', fontWeight: 400, fontSize: 20}}>Описание: </h4>
                            {isEditing
                                ?
                                (<Form.Control value={newDescription} onChange={e => setNewDescription(e.target.value)} className="mt-3" placeholder="description"/>)

                                :
                                <h4 style={{ fontFamily: 'Century Gothic', fontWeight: 400, fontSize: 20}}><div> {adState.description}</div></h4>}

                        </div>
                    </Row>
                </Col>
                <Col md={3}>
                    <br/>
                    {user && user.user.image &&
                        (
                            <div>
                                <img src={user.user.image} alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                                <h5>{user.user.username}</h5>
                            </div>
                        )}
                    {!user && (
                        <p>Загружаем фото...</p>
                        )}

                    {(user.isAuth && adState.userId === user.user.id  || user.user.role === "ADMIN" || user.user.role === "MODERATOR") ?
                        <>
                            <div>
                                {isEditing ? (<button title="Выйти из сохранения" className="image-button2" onClick={handleSave}>
                                        <div style={{ backgroundImage: `url(${component6})` }}></div>
                                    </button>)
                                    :
                                    (<button title="Редактировать объявление" className="image-button2" onClick={handleEditing}>
                                        <div style={{ backgroundImage: `url(${component6})` }}></div>
                                    </button>)}
                                <button title="Удалить объявление" className="image-buttonDelete" onClick={handleDelete}>
                                    <div style={{ backgroundImage: `url(${component12})` }}></div>
                                </button>
                            </div>
                        </>
                        :
                        <div></div>
                    }
                    <div >

                    </div>
                    <Card className="shadow-box" border={"light"}>

                        <Card.Body >
                            <Card.Text>
                                <Button variant={"outline-dark"} onClick={() => navigate(PROFILE_PAGE + '/' + adState.userId)}>Продавец</Button>
                            </Card.Text>
                            <Card.Text>
                                <div>Адрес: {adState.address}</div>
                            </Card.Text>
                            <Card.Text>
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
                            </Card.Text>
                            <Card.Text>
                                <div>Статус: {getStatusText(adState.status)}</div>
                                {adState.userId === user.user.id && (
                                    <div>
                                        <Button variant={"outline-dark"} style={{ marginTop:  '10px' }}
                                                onClick={() => handleStatusChange(adState.id)}
                                        >
                                            Изменить статус
                                        </Button>
                                    </div>
                                )}
                            </Card.Text>
                        </Card.Body>
                    </Card>

                    {isEditing
                        ? <Button variant={"outline-success"} onClick={adUpdate} style={{ marginTop:  '10px' }}>Сохранить изменения</Button>
                        : null
                    }



                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">

                <h1 style={{ fontFamily: 'Century Gothic', fontWeight: 500, fontSize: 40}}>Характеристики</h1>
                <br/>
                {description.map((info, index) =>
                    <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                        {info.name}: {info.description}
                    </Row>
                )}

            </Row>
            <Row className="d-flex flex-column m-3">


                <h1 style={{ fontFamily: 'Century Gothic', fontWeight: 500, fontSize: 40}}>Комментарии</h1>
                {showComments ? (
                    <div>
                        <Button variant={"outline-dark"} onClick={() => setShowComments(false)}>Скрыть комментарии</Button>
                        {comments ? (
                            <div>

                                <ul>
                                    {comments.map((comment) => (
                                        <li key={comment.id} style={{ marginTop:  '10px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <Circle color="#008037" letters={getUserForComment(comment.userId).username.charAt(0)} />
                                                <strong>
                                                    <h4 style={{ marginLeft: '10px', marginRight: '10px' }}>

                                                        <Link to={ PROFILE_PAGE + '/' + comment.userId} style={{ color: '#575757' }}>
                                                            {getUserForComment(comment.userId).username}
                                                        </Link>
                                                    </h4>
                                                </strong>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <h6 style={{ marginLeft: '10px'}}>{comment.text}</h6>
                                                {(user.isAuth && comment.userId === user.user.id || user.user.role === "ADMIN" || user.user.role === "MODERATOR") ?
                                                    <Button variant={"outline-dark"} style={{marginLeft: 'auto'}} onClick={() => handleDeleteComment(comment.id)}>Удалить комментарий</Button>
                                                    : null
                                                }

                                            </div>

                                        </li>
                                    ))}
                                </ul>

                               <div>
                                   <Form.Control value={newComment} onChange={e => setNewComment(e.target.value)} className="mt-3" placeholder="оставьте свой комментарий здесь"/>
                                   <Button
                                       className="mt-3"
                                       variant="outline-success btn-expensive"
                                       onClick={handleSubmit}
                                   >
                                       Добавить
                                   </Button>
                                   <CommentModal
                                       show={showModal}
                                       handleClose={() => setShowModal(false)}
                                       title="Войдите, чтобы оставить комментарий"
                                       body="Вы должны быть авторизованы, чтобы оставлять комментарии"
                                   />
                               </div>
                            </div>
                        ) : (
                            <p>Загрузка комментариев...</p>
                        )}
                    </div>
                ) : (
                    <div>
                        <Button variant={"outline-dark"} onClick={() => setShowComments(true)}>Отобразить комментарии</Button>
                    </div>
                )}
            </Row>

        </Container>
    );

});

export default Ad;
