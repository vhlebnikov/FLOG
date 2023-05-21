import React, {useEffect, useState} from 'react';
import {Modal, Button, Col, Form, Row, Dropdown, } from "react-bootstrap";
import {NOT_FOUND_AD_PAGE,} from "../utils/consts";
import {useNavigate} from "react-router-dom";
import {useParams} from 'react-router-dom';
import {getOneAd, getPrice, updateAd} from "../http/adApi";
import {getUser} from "../http/userApi";
import {getCategoryRoute} from "../http/categoryApi";


function AdEditModal(props) {
    const navigate = useNavigate()

    // владелец объявления
    const [userLoc, setUserLoc] = useState(null)

    // объявление внутри страницы его будем выводить
    const [adState, setAdState] = useState({info: []})

    // ========= локально меняем их и посылаем их в запросах =====
    const [name, setName] = useState(null)
    const [description, setDescription] = useState(null)
    const [address, setAddress] = useState(null)
    const [status, setStatus] = useState(null)

    const [info, setInfo] = useState([])
    const [image, setImage] = useState([])

    // Вот этих мужиков отдельно получаем и выводим
    const [price, setPrice] = useState(null)
    const [categoryRoute, setCategoryRoute] = useState(null)

    // а их меняем и отправляем в запросы
    const [priceLoc, setPriceLoc] = useState(null)
    const [categoryRouteLoc, setCategoryRouteLoc] = useState(null)
    // ============================================================


    const params = useParams()
    const id = parseInt(params.id)


    const fetchData = async () => {
        await Promise.resolve(getOneAd(id)).then(data => {
            if (data) {
                setAdState(data)
            } else {
                navigate(NOT_FOUND_AD_PAGE)
            }
        })
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



    const nameHandler = (e) => {
        setName(e.target.value)
    }

    const descriptionHandler = (e) => {
        setDescription(e.target.value)
    }

    const addressHandler = (e) => {
        setAddress(e.target.value)
    }

    const statusHandler = () => {
        setStatus(getNextStatus(status))
    }

    const imageHandler = (e) => {
        setImage(Array.from(e.target.files))
    }

    const addInfo = () => {
        setInfo([...info, {name: '', description: '', id: Date.now()}])
    }
    const removeInfo = (id) => {
        setInfo(info.filter(i => i.id !== id))
    }
    const changeInfo = (key, value, id) => {
        setInfo(info.map(i => i.id === id ? {...i, [key]: value} : i))
    }

    const priceHandler = (key, value) => {
        setPrice({...price, [key]: value})
    }




    const adUpdate = () => {
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
            if (price) {
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
            window.location.reload();

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



    return (
        <Modal show={props.show} onHide={props.handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Редактирование объявления</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/*Внизу изменение объявления*/}
                <Form.Label>Имя</Form.Label>
                <Form.Control value={name} onChange={nameHandler}/>
                <Form.Label>Описание</Form.Label>
                <Form.Control value={description} onChange={descriptionHandler}/>

                <Form.Label>Адрес</Form.Label>
                <Form.Control value={address} onChange={addressHandler}/>
                <Row>
                    <Form.Label>{`Статус: ${getStatusText(status)}`}</Form.Label>
                    <Button variant={"outline-dark"} style={{ marginTop:  '10px' }}
                            onClick={statusHandler}
                    >
                        Изменить статус
                    </Button>
                </Row>
                <Form.Label>Картинки</Form.Label>
                <Form.Control
                    className="mt-3"
                    type="file"
                    multiple
                    required
                    onChange={imageHandler}
                />

                <Dropdown className="mt-3">
                    <Dropdown.Toggle className="expensive-button" variant="success" >{"Выберите тип цены"}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => priceHandler('type', 0)}>{"Без цены"}</Dropdown.Item>
                        <Dropdown.Item onClick={() => priceHandler('type', 1)}>{"Определенная цена"}</Dropdown.Item>
                        <Dropdown.Item onClick={() => priceHandler('type', 2)}>{"Интервал"}</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                {price ?
                    (
                        <div>
                            {price.type === 0 ?
                                null
                                :
                                <Row>
                                    <Col md={4}>
                                        <Form.Control
                                            value={price.start}
                                            type="number"
                                            onChange={(e) => priceHandler('start', Number(e.target.value))}
                                            className="mt-2"
                                            placeholder="цена"
                                        />
                                    </Col>
                                    {price.type === 2 ?
                                        <Col md={4}>
                                            <Form.Control
                                                value={price.end}
                                                type="number"
                                                onChange={(e) => priceHandler('end', Number(e.target.value))}
                                                className="mt-2"
                                                placeholder="цена"
                                            />
                                        </Col>
                                        :
                                        null
                                    }
                                </Row>
                            }
                        </div>
                    ) : (
                        <div className="spinner-border" role="status">
                            <span className="sr-only"/>
                        </div>
                    )}



                <Button
                    className="mt-3 btn-expensive"
                    variant="outline-success"
                    onClick={addInfo}
                >
                    Добавить новое свойство
                </Button>
                {info.map(i =>
                    <Row className="mt-4" key={i.id}>
                        <Col md={4}>
                            <Form.Control
                                value={i.name}
                                onChange={(e) => changeInfo('name', e.target.value, i.id)}
                                placeholder="Введите название свойства"
                            />
                        </Col>
                        <Col md={4}>
                            <Form.Control
                                value={i.description}
                                onChange={(e) => changeInfo('description', e.target.value, i.id)}
                                placeholder="Введите описание свойства"
                            />
                        </Col>
                        <Col md={4}>
                            <Button
                                className="btn-expensive"
                                onClick={() => removeInfo(i.id)}
                                variant={"outline-danger"}
                            >
                                Удалить
                            </Button>
                        </Col>
                    </Row>
                )}


            </Modal.Body>
            <Modal.Footer>

                <Button className="mt-3"
                        variant="outline-success btn-expensive"
                        onClick={() => adUpdate()}>
                    Сохранить изменения
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
export default AdEditModal;