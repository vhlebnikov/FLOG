import React, {useState} from 'react';
import {Button, Col, Dropdown, Form, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {createAd} from "../http/adApi";
import {useNavigate} from "react-router-dom";
import {SHOP_PAGE} from "../utils/consts";

const CreateForm = observer(() => {
    const navigate = useNavigate()
    const [file, setFile] = useState(null)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [address, setAddress] = useState('')
    const [info, setInfo] = useState([])
    const [price, setPrice] = useState({type: 0, start: 0, end: 0})

    const selectFile = e => {
        setFile(Array.from(e.target.files))
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

    const changePrice = (key, value) => {
        setPrice({...price, [key]: value})
    }

    const addAd = async () => {
        const formData = new FormData()
        for (const f of file) {
            formData.append('image', f)
        }
        formData.append('name', name)
        formData.append('description', description)
        formData.append('address', address)
        formData.append('status', 1)
        formData.append('subSubCategoryId', 13)
        formData.append('price', JSON.stringify(price))
        formData.append('info', JSON.stringify(info))
        await Promise.resolve(createAd(formData))
        navigate(SHOP_PAGE)
    }

    return (
        <Form>
            <Form.Control value={name} onChange={e => setName(e.target.value)} className="mt-3" placeholder="name"/>
            <Dropdown className="mt-3">
                <Dropdown.Toggle className="btn-expensive" variant="success" >{"Выберите тип цены"}</Dropdown.Toggle>
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
                        <Form.Control
                            value={price.start}
                            type="number"
                            onChange={(e) => changePrice('start', Number(e.target.value))}
                            className="mt-2"
                            placeholder="цена"
                        />
                    </Col>
                    {price.type === 2 ?
                        <Col md={4}>
                            <Form.Control
                                value={price.end}
                                type="number"
                                onChange={(e) => changePrice('end', Number(e.target.value))}
                                className="mt-2"
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
            <hr/>
            <Button className="mt-3" variant="outline-success btn-expensive" onClick={addAd}>Добавить</Button>
        </Form>
    );
});

export default CreateForm;