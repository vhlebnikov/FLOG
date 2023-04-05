import React, {useContext, useState} from 'react';
import {Context} from "../index";
import {Button, Col, Form, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {createAd} from "../http/adAPI";

const CreateForm = observer(() => {
    const {ad} = useContext(Context)
    const [file, setFile] = useState(null)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [address, setAddress] = useState('')
    const [price, setPrice] = useState(null)

    const selectFile = e => {
        setFile(e.target.files[0])
    }


    const addAd = () => {
        const formData = new FormData()
        formData.append('image', file)
        formData.append('name', name)
        formData.append('description', description)
        formData.append('address', address)
        formData.append('price', `{"type":1,"start":${price}}`)
        formData.append('subSubCategoryId', 13)
        ad.setAds(formData)
        createAd(formData)
    }

    return (
        <Form>
            <Form.Control value={name} onChange={e => setName(e.target.value)} className="mt-3" placeholder="name"/>
            {/*<Form.Select value={price} onChange={e => setName(e.target.value)} className="mt-3">*/}
            {/*    <option>Type of price</option>*/}
            {/*    <option>1</option>*/}
            {/*    <option>2</option>*/}
            {/*    <option>3</option>*/}
            {/*</Form.Select>*/}
            <Form.Control
                value={price}
                onChange={e => setPrice(Number(e.target.value))}
                className="mt-3"
                placeholder="price"
                type="number"
            />
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

            <Button className="mt-3" variant="outline-success" onClick={addAd}>Добавить</Button>
        </Form>
    );
});

export default CreateForm;