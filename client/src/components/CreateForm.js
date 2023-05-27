import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Dropdown, Form, InputGroup, Row, Toast, ToastContainer} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {createAd} from "../http/adApi";
import {useNavigate} from "react-router-dom";
import {SHOP_PAGE} from "../utils/consts";
import frog from "../assets/FrogSmile.svg";
import VerEx from "verbal-expressions";
import CategoryCascader from "./CategoryCascader";

const CreateForm = observer(() => {
    const navigate = useNavigate()
    const [file, setFile] = useState([])
    const [fileError, setFileError] = useState(null)

    const [name, setName] = useState('')
    const [nameError, setNameError] = useState(null)

    const [description, setDescription] = useState('')
    const [descriptionError, setDescriptionError] = useState(null)

    const [address, setAddress] = useState('')
    const [addressError, setAddressError] = useState(null)

    const [info, setInfo] = useState([])
    const [infoError, setInfoError] = useState(null)

    const [price, setPrice] = useState({type: 0, start: 0, end: 0})
    const [priceStartError, setPriceStartError] = useState(null)
    const [priceEndError, setPriceEndError] = useState(null)

    const [selectedCategory, setSelectedCategory] = useState(null)
    const [categoryError, setCategoryError] = useState(null)

    const [submit, setSubmit] = useState(false)

    const notEmptyRegExp = VerEx().startOfLine().something().endOfLine()
    const isEmpty = (word) => {
        const ans = !notEmptyRegExp.test(word)
        notEmptyRegExp.lastIndex = 0
        return ans
    }

    useEffect(() => {
        if (submit && !fileError) {
            navigate(SHOP_PAGE)
        }
    }, [submit, fileError])

    const selectFile = e => {
        setFile(Array.from(e.target.files))
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

    const addInfo = () => {
        setInfo([...info, {name: '', description: '', id: Date.now()}])
    }
    const removeInfo = (id) => {
        setInfo(info.filter(i => i.id !== id))
    }
    const changeInfo = (key, value, id) => {
        setInfo(info.map(i => i.id === id ? {...i, [key]: value} : i))
    }

    const changePrice = (key, e) => {
        if (key === 'type') {
            setPrice({...price, [key]: e})
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
            setPrice({...price, [key]: e.target.value})
        }
    }

    useEffect(() => {
        if (selectedCategory) {
            setCategoryError(null)
        }
    }, [selectedCategory])

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
        if (!file.length) {
            await setFileError("Загрузите фото")
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

        if ((price.type === 1 || price.type === 2) && isEmpty(price.start)) {
            await setPriceStartError("Введите цену")
            flag = false
        }

        if (price.type === 2) {
            if (isEmpty(price.end)) {
                await setPriceEndError("Введите цену")
                flag = false
            } else if (!isEmpty(price.start) && price.end < price.start) {
                await setPriceEndError("Конечная цена не может быть ниже начальной")
                flag = false
            }
        }

        return flag
    }

    const addAd = async () => {
        checkFields().then((data) => {
            if (data) {
                setInfoError(null)

                const formData = new FormData()
                for (const f of file) {
                    formData.append('image', f)
                }
                formData.append('name', name)
                formData.append('description', description)
                formData.append('address', address)
                formData.append('status', 1)
                formData.append('categoryId', selectedCategory)
                formData.append('price', JSON.stringify(price))
                formData.append('info', JSON.stringify(info))
                createAd(formData).catch(e => {
                    setFileError(e.response.data.message)
                }).then(() => {
                    setSubmit(true)
                })
            }
        })
    }

    return (
        <Form>
            <Form.Label>Выберите категорию объявления</Form.Label>
            <InputGroup>
                <Form.Group>
                    <CategoryCascader others={[selectedCategory, setSelectedCategory]}/>
                </Form.Group>
            </InputGroup>
            {categoryError ? <Form.Label
                style={{
                    fontSize: 13,
                    WebkitTextFillColor: "#dc3545"
                }}
            >
                {categoryError}
            </Form.Label> : null}
            <InputGroup hasValidation>
                <Form.Control
                    value={name}
                    onChange={e => nameHandler(e)}
                    className="mt-3"
                    placeholder="Название объявления"
                    required
                    isInvalid={!!nameError}
                />
                <Form.Control.Feedback type="invalid">
                    {nameError}
                </Form.Control.Feedback>
            </InputGroup>
            <Dropdown className="mt-3">
                <Dropdown.Toggle className="btn-expensive" variant="success">{"Выберите тип цены"}</Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => changePrice('type', 0)}>{"Без цены"}</Dropdown.Item>
                    <Dropdown.Item onClick={() => changePrice('type', 1)}>{"Определенная цена"}</Dropdown.Item>
                    <Dropdown.Item onClick={() => changePrice('type', 2)}>{"Интервал"}</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            {price.type === 0 ?
                null
                :
                <Row>
                    <Col md={4}>
                        <InputGroup hasValidation>
                            <InputGroup.Text className="mt-2">₽</InputGroup.Text>
                            <Form.Control
                                required
                                isInvalid={!!priceStartError}
                                value={price.start}
                                onChange={(e) => changePrice('start', e)}
                                className="mt-2"
                                placeholder="Цена"
                            />
                            <Form.Control.Feedback type={"invalid"}>
                                {priceStartError}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Col>
                    {price.type === 2 ?
                        <Col md={4}>
                            <InputGroup hasValidation>
                                <InputGroup.Text className="mt-2">₽</InputGroup.Text>
                                <Form.Control
                                    required
                                    isInvalid={!!priceEndError}
                                    value={price.end}
                                    onChange={(e) => changePrice('end', e)}
                                    className="mt-2"
                                    placeholder="Конечная цена"
                                />
                                <Form.Control.Feedback type={"invalid"}>
                                    {priceEndError}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Col>
                        :
                        null
                    }
                </Row>

            }
            <InputGroup hasValidation>
                <Form.Control
                    required
                    isInvalid={!!addressError}
                    value={address}
                    onChange={e => addressHandler(e)}
                    className="mt-3"
                    placeholder="Адрес"
                />
                <Form.Control.Feedback type="invalid">
                    {addressError}
                </Form.Control.Feedback>
            </InputGroup>

            <InputGroup hasValidation>
                <Form.Control
                    required
                    isInvalid={!!descriptionError}
                    value={description}
                    onChange={e => descriptionHandler(e)}
                    className="mt-3"
                    as="textarea" rows={3}
                    placeholder="Описание"
                />
                <Form.Control.Feedback type="invalid">
                    {descriptionError}
                </Form.Control.Feedback>
            </InputGroup>

            <Form.Control
                className="mt-3"
                type="file"
                multiple
                required
                onChange={selectFile}
            />

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
                        <InputGroup hasValidation>
                            <Form.Control
                                required
                                isInvalid={isEmpty(i.name) && !!!!infoError}
                                value={i.name}
                                onChange={(e) => changeInfo('name', e.target.value, i.id)}
                                placeholder="Введите название свойства"
                            />
                        </InputGroup>
                    </Col>
                    <Col md={4}>
                        <InputGroup hasValidation>
                            <Form.Control
                                required
                                isInvalid={isEmpty(i.description) && !!infoError}
                                value={i.description}
                                onChange={(e) => changeInfo('description', e.target.value, i.id)}
                                placeholder="Введите описание свойства"
                            />
                        </InputGroup>
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
            <hr/>
            <Button
                className="mt-3"
                variant="outline-success btn-expensive"
                onClick={addAd}
            >Добавить</Button>

            <ToastContainer
                className="p-3"
                position={'bottom-end'}
            >
                <Toast
                    onClose={() => {
                        setSubmit(false)
                        setFileError(null)
                    }}
                    show={!!fileError}
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
                        {fileError}
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </Form>
    );
});

export default CreateForm;