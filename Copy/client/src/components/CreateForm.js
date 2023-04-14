import React, {useContext, useState} from 'react';
import {Context} from "../index";
import {Button, Col, Dropdown, Form, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {createAd} from "../http/adAPI";
import {useNavigate} from "react-router-dom";
import {SHOP_PAGE} from "../utils/consts";

const CreateForm = observer(() => {
    const navigate = useNavigate()
    const {ad} = useContext(Context)
    const [file, setFile] = useState(null)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [address, setAddress] = useState('')
    const [prices, setPrices] = useState([{type:'start', price: null}, {type:'end', price: null}])
    const [info, setInfo] = useState([])
    const [priceType, setPriceType] = useState(0)

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const changePrice = (type, value) => {
        setPrices(prices.map(i => i.type = type ? {...i, price: value} : i))
    }

    const addInfo = () => {
        setInfo([...info, {name: '', description: '', number: Date.now()}])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }
    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const addAd = () => {
        const formData = new FormData()
        formData.append('image', file)
        formData.append('name', name)
        formData.append('description', description)
        formData.append('address', address)
        formData.append('price', `{"type":${priceType}, "start":${prices[0].price}, "end":${prices[1].price}}`)
        formData.append('subSubCategoryId', 13)
        formData.append('info', JSON.stringify(info))
        ad.setAds(formData)
        createAd(formData)
    }

    return (
        <Form>
            <Form.Control value={name} onChange={e => setName(e.target.value)} className="mt-3" placeholder="name"/>
            <Dropdown className="mt-3">
                <Dropdown.Toggle className="expensive-button" variant="success" >{"Выберите тип цены"}</Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setPriceType(0)}>{"Без цены"}</Dropdown.Item>
                    <Dropdown.Item onClick={() => setPriceType(1)}>{"Определенная цена"}</Dropdown.Item>
                    <Dropdown.Item onClick={() => setPriceType(2)}>{"Интервал"}</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            {priceType === 0 ?
                null
                :
                <Row>
                    <Col md={4}>
                        <Form.Control
                            value={prices[0].price}
                            type="number"
                            onChange={(e) => changePrice('start', Number(e.target.value))}
                            className="mt-3"
                            placeholder="цена"
                        />
                    </Col>
                    {priceType === 2 ?
                        <Col md={4}>
                            <Form.Control
                                value={prices[1].price}
                                type="number"
                                onChange={(e) => changePrice('end', Number(e.target.value))}
                                className="mt-3"
                                placeholder="цена"
                            />
                        </Col>
                        :
                        null
                    }
                </Row>

            }
            <Form.Control
                value={address}
                onChange={e => setAddress(e.target.value)}
                className="mt-3"
                placeholder="address"
            />
            <Form.Control
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="mt-3"
                as="textarea" rows={3}
                placeholder="description"
            />
            <Form.Control
                className="mt-3"
                type="file"
                onChange={selectFile}
            />

            <Button
                className="mt-3"
                variant="outline-success"
                onClick={addInfo}
            >
                Добавить новое свойство
            </Button>
            {info.map(i =>
                <Row className="mt-4" key={i.number}>
                    <Col md={4}>
                        <Form.Control

                            value={i.name}
                            onChange={(e) => changeInfo('name', e.target.value, i.number)}
                            placeholder="Введите название свойства"
                        />
                    </Col>
                    <Col md={4}>
                        <Form.Control
                            value={i.description}
                            onChange={(e) => changeInfo('description', e.target.value, i.number)}
                            placeholder="Введите описание свойства"
                        />
                    </Col>
                    <Col md={4}>
                        <Button
                            onClick={() => removeInfo(i.number)}
                            variant={"outline-danger"}
                        >
                            Удалить
                        </Button>
                    </Col>
                </Row>
            )}

            <Button className="mt-3" variant="outline-success" onClick={addAd}>Добавить</Button>
        </Form>
    );
});

export default CreateForm;