import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, Row, Image} from 'react-bootstrap';
import ImageUploader from "../dasha/ImageUploader";
import {useParams} from "react-router-dom";
import {getContacts, getUser, updateContacts, updateData} from "../http/userApi";
import Form from "react-bootstrap/Form";
import {Context} from "../index";
import AdItem from "../components/AdItem";
import {observer} from "mobx-react-lite";
import {getAdsForUser} from "../http/adApi";

const Profile = observer(() => {
    const [userLoc, setUserLoc] = useState(undefined)
    const [username, setUsername] = useState(undefined)
    const [image, setImage] = useState(undefined)

    const [isEditing, setEditing] = useState(false)

    const [contacts, setContacts] = useState([])
    const [contactsLoc, setContactsLoc] = useState([])

    const [adsLoc, setAdsLoc] = useState([])

    const {user} = useContext(Context)

    const params = useParams()
    const id = parseInt(params.id)

    useEffect(() => {
        getAdsForUser(id).then(data => setAdsLoc(data.rows))
    }, [])

    useEffect(() => {
        getUser(id).then(data => setUserLoc(data))
        getContacts(id).then(data => setContacts(data))
    }, [])

    useEffect(() => {
        if (userLoc) {
            setUsername(userLoc.username)
        }
    }, [userLoc])

    useEffect(() => {
        if (contacts) {
            setContactsLoc(contacts)
        }
    }, [contacts])

    const handleEditing = () => {
        setEditing(true)
    }

    const handleSave = () => {
        setEditing(false)
        if (image || username || contactsLoc) {
            const formData = new FormData()
            if (image) {
                formData.append('image', image)
            }
            if (username && username !== userLoc.username) {
                formData.append('username', username)
            }
            updateData(formData).then(data => setUserLoc(data))

            if (contactsLoc) {
                updateContacts(contactsLoc).then(data => setContacts(data))
            }
        }
    }

    const selectFile = e => {
        setImage(e.target.files[0])
    }

    const addContactLoc = () => {
        setContactsLoc([...contactsLoc, {id: Date.now(), name: '', contact: ''}])
    }

    const removeContactLoc = (id) => {
        setContactsLoc(contactsLoc.filter(i => i.id !== id))
    }

    const changeContactLoc = (key, value, id) => {
        setContactsLoc(contactsLoc.map(i => i.id === id ? {...i, [key]: value} : i))
    }

    return (
        <Container className="personalMain">
            <h2 className="perHead">Персональные данные</h2>
            <Row md={3} className="perData">
                <Col xs={6}>
                    <Form>
                        {/*<ImageUploader/>*/}
                        {userLoc && userLoc.image ?
                            <Image
                                thumbnail
                                src={process.env.REACT_APP_API_URL + userLoc.image}
                            />
                            : <div>У пользователя нет картинки :(</div>
                        }

                        {isEditing ?
                        <Form.Control
                            className="mt-3"
                            size={"sm"}
                            type="file"
                            onChange={selectFile}
                        /> :
                            <div className = "invisible">
                                <Form.Control
                                    className="mt-3"
                                    size={"sm"}
                                />
                            </div>}
                    </Form>
                </Col>

                <Col xs={6} className="blockPersonal">
                    <div className="forPersonal2">
                        <h5>Имя:</h5>
                        {userLoc && userLoc.username ?
                            (isEditing
                                ? (<Form.Control
                                    className = "perInput"
                                    type="text"
                                    value={username}
                                    onChange={(event) => setUsername(event.target.value)}
                                />)
                                : (<p className="perText">{userLoc.username}</p>))
                        : null
                        }
                    </div>

                    <div className="forPersonal2">
                        <h5>Email:</h5>
                        {userLoc && userLoc.email ? <p className="perText">{userLoc.email}</p> : null}
                    </div>
                    <div className="forPersonal2">
                        <h5>Контакты:</h5>
                        {contacts && contactsLoc ?
                            (isEditing
                                    ? (
                                        <Form>
                                            {contactsLoc.map(i => (
                                                <Row key={i.id}>
                                                    <Col xl={3}>
                                                        <Form.Control
                                                            value={i.name}
                                                            onChange={(e) => changeContactLoc('name', e.target.value, i.id)}
                                                        />
                                                    </Col>
                                                    <Col xl={3}>
                                                        <Form.Control
                                                            value={i.contact}
                                                            onChange={(e) => changeContactLoc('contact', e.target.value, i.id)}
                                                        />
                                                    </Col>
                                                    <Col xl={3}>
                                                        <Button
                                                            className="expensive-button"
                                                            variant="success"
                                                            onClick={() => removeContactLoc(i.id)}
                                                        >
                                                            Удалить
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            ))}
                                            <Button
                                                className="expensive-button"
                                                variant="success"
                                            onClick={addContactLoc}
                                        >
                                            Добавить
                                        </Button>
                                        </Form>
                                    )
                                    : (<div>
                                        <ul>
                                            {contacts.map(contact => (
                                                <li key={contact.id} className="perLi">
                                                    <strong>{contact.name}</strong> {contact.contact}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>)
                            )
                        : null
                        }
                    </div>
                </Col>
                {user.user.id === id ? <Col>
                    <label>
                        {isEditing ? (<Button
                            className="expensive-button"
                            variant="success"
                            onClick={handleSave}
                            >Сохранить</Button>
                        ) : (
                            <Button
                                className="expensive-button"
                                variant="success"
                                onClick={handleEditing}
                            >Редактировать</Button>)}
                    </label>
                    <Button className="expensive-button" variant="success">Сменить пароль</Button>
                </Col> : null}
            </Row>
            <Row>
                <h2 className="perHead">Ваши объявления</h2>
                {Array.isArray(adsLoc) && adsLoc.map(i => (
                    i.userId === id ? (
                        <AdItem key = {i.id} ad = {i}/>
                    ) : null
                ))}
            </Row>
        </Container>
    );
})

export default Profile;