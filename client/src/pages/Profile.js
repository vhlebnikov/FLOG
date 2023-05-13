import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, Row, Image, Modal} from 'react-bootstrap';
import {useParams} from "react-router-dom";
import {checkPassword, getContacts, getUser, updateContacts, updateData, updatePassword} from "../http/userApi";
import Form from "react-bootstrap/Form";
import {Context} from "../index";
import AdItem from "../components/AdItem";
import {observer} from "mobx-react-lite";
import {getAdsForUser} from "../http/adApi";
import VerEx from "verbal-expressions";

function ChangePasswordModal(props) {
    const [passwordLoc, setPasswordLoc] = useState("")
    const [passwordError, setPasswordError] = useState(null)

    const [passwordMatch, setPasswordMatch] = useState(null)

    const notEmptyRegExp = VerEx().startOfLine().something().endOfLine()
    const isEmpty = (word) => {
        const ans = !notEmptyRegExp.test(word)
        notEmptyRegExp.lastIndex = 0
        return ans
    }

    const handlePassword = (e) => {
        setPasswordLoc(e.target.value)
        if (!passwordMatch) {
            setPasswordMatch(null)
        }
        if (isEmpty(e.target.value)) {
            setPasswordError("Введите пароль пожалуйста")
        } else {
            setPasswordError(null)
        }
    }

    const passwordCheck = () => {
        checkPassword(passwordLoc).then(data => setPasswordMatch(data))
        setPasswordLoc("")
    }

    const changePassword = () => {
        updatePassword(passwordLoc).then(data => alert(`${data.username} вы успешно сменили пароль`))
        setPasswordLoc("")
        setPasswordMatch(null)
        props.onHide()
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Смена пароля
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {passwordMatch ?
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Введите новый пароль</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Пароль"
                                value={passwordLoc}
                                onChange={e => handlePassword(e)}
                            />

                            {passwordError ? <Form.Label style={{color: 'red'}}>{passwordError}</Form.Label> : null}

                        </Form.Group>
                    </Form>
                :
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Введите старый пароль</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Пароль"
                                value={passwordLoc}
                                onChange={e => handlePassword(e)}
                            />

                            {passwordError ? <Form.Label style={{color: 'red'}}>{passwordError}</Form.Label> : null}

                            {passwordMatch === false ? <Form.Label style={{color: 'red'}}>Неверный пароль</Form.Label> : null}
                        </Form.Group>
                    </Form>
                }
            </Modal.Body>

            <Modal.Footer>
                {passwordMatch ?
                    <Button onClick={changePassword}>Сменить пароль</Button>
                :
                    <Button onClick={passwordCheck}>Проверить</Button>
                }
            </Modal.Footer>
        </Modal>
    );
}

const Profile = observer(() => {
    const [userLoc, setUserLoc] = useState(undefined)
    const [username, setUsername] = useState(undefined)
    const [image, setImage] = useState(undefined)

    const [isEditing, setEditing] = useState(false)

    const [contacts, setContacts] = useState([])
    const [contactsLoc, setContactsLoc] = useState([])
    const [contactsError, setContactsError] = useState(null)

    const [adsLoc, setAdsLoc] = useState([])

    const [modalShow, setModalShow] = useState(false)

    const {user} = useContext(Context)

    const params = useParams()
    const id = parseInt(params.id)

    const notEmptyRegExp = VerEx().startOfLine().something().endOfLine()
    const isEmpty = (word) => {
        const ans = !notEmptyRegExp.test(word)
        notEmptyRegExp.lastIndex = 0
        return ans
    }

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
        if (contactsLoc.filter(i => isEmpty(i.name) || isEmpty(i.contact)).length) {
            setContactsError("Контакты не могут быть пустыми")
        } else {
            setContactsError(null)
            setEditing(false)
            if (image || username) {
                const formData = new FormData()
                if (image) {
                    formData.append('image', image)
                }
                if (username && username !== userLoc.username) {
                    formData.append('username', username)
                }
                updateData(formData).then(data => setUserLoc(data))
            }
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
                        {contactsLoc ?
                            (isEditing
                                    ? (
                                        <Form>
                                            {contactsLoc.map(i => (
                                                <Row key={i.id} className="perRow">
                                                    <Col xl={3}>
                                                        <Form.Control
                                                            value={i.name}
                                                            onChange={(e) => changeContactLoc('name', e.target.value, i.id)}
                                                            required
                                                        />
                                                    </Col>
                                                    <Col xl={6}>
                                                        <Form.Control
                                                            value={i.contact}
                                                            onChange={(e) => changeContactLoc('contact', e.target.value, i.id)}
                                                            required
                                                        />
                                                    </Col>
                                                    <Col xl={3}>
                                                        <Button
                                                            className="expensive-button"
                                                            variant="success"
                                                            type="submit"
                                                            onClick={() => removeContactLoc(i.id)}
                                                        >
                                                            Удалить
                                                        </Button>
                                                    </Col>
                                                </Row>

                                            ))}

                                            {contactsError ? <Form.Label style={{color: 'red'}}>{contactsError}</Form.Label> : null}

                                            <Button
                                                style = {{float:'right'}}
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
                                                    <strong>{contact.name}:</strong> {contact.contact}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>)
                            )
                            : null
                        }
                    </div>

                    {user.user.id === id ?
                        <label className="personalButton">
                            {isEditing ? (
                                <Button
                                    className="expensive-button"
                                    variant="success"
                                    onClick={handleSave}
                                >Сохранить</Button>)
                                : (
                                <Button
                                    className="expensive-button"
                                    variant="success"
                                    onClick={handleEditing}
                                >Редактировать</Button>
                                )}
                        </label>
                    : null}
                </Col>

                {user.user.id === id ? <Col xs={6} className="blockPersonal">
                    <Button
                        style = {{float:'right'}}
                        className="expensive-button"
                        variant="success"
                        onClick={() => setModalShow(true)}
                    >Сменить пароль</Button>
                </Col> : null}
            </Row>

            <ChangePasswordModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />

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