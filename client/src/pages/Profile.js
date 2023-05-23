import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, Row, Image, Modal, InputGroup, Toast, ToastContainer, ModalBody} from 'react-bootstrap';
import {useParams} from "react-router-dom";
import {checkPassword, getContacts, getUser, updateContacts, updateData, updatePassword} from "../http/userApi";
import Form from "react-bootstrap/Form";
import {Context} from "../index";
import AdItem from "../components/AdItem";
import {observer} from "mobx-react-lite";
import {getAdsForUser} from "../http/adApi";
import VerEx from "verbal-expressions";
import frog from "../assets/FrogSmile.svg";

function ChangePasswordModal(props) {
    const [passwordLoc, setPasswordLoc] = useState("")
    const [passwordError, setPasswordError] = useState(null)

    const [passwordMatch, setPasswordMatch] = useState(null)
    const [alertMessage, setAlertMessage] = useState(null)

    const notEmptyRegExp = VerEx().startOfLine().something().endOfLine()
    const isEmpty = (word) => {
        const ans = !notEmptyRegExp.test(word)
        notEmptyRegExp.lastIndex = 0
        return ans
    }

    useEffect(() => {
        if (passwordMatch === false) {
            setPasswordError("Неверный пароль")
        }
    }, [passwordMatch])

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
        if (isEmpty(passwordLoc)) {
            setPasswordError("Введите пароль пожалуйста")
            return
        }
        checkPassword(passwordLoc).then(data => setPasswordMatch(data))
        setPasswordLoc("")
    }

    const changePassword = () => {
        if (isEmpty(passwordLoc)) {
            setPasswordError("Введите пароль пожалуйста")
            return
        }
        updatePassword(passwordLoc).then(data => setAlertMessage(`${data.username} вы успешно сменили пароль`))
        setPasswordLoc("")
        setPasswordMatch(null)
        setTimeout(() => {
            setAlertMessage(null)
            props.onHide()
        }, 1000)
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
                    {alertMessage ? alertMessage : "Смена пароля"}
                </Modal.Title>
            </Modal.Header>

            {!alertMessage ? <Modal.Body>
                    {passwordMatch ?
                        <Form>
                            <Form.Label>Введите новый пароль</Form.Label>
                            <InputGroup className="mb-3" hasValidation>
                                <Form.Control
                                    required
                                    isInvalid={!!passwordError}
                                    type="password"
                                    placeholder="Пароль"
                                    value={passwordLoc}
                                    onChange={e => handlePassword(e)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {passwordError}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form>
                        :
                        <Form>
                            <Form.Label>Введите старый пароль</Form.Label>
                            <InputGroup className="mb-3" hasValidation>
                                <Form.Control
                                    required
                                    isInvalid={!!passwordError}
                                    type="password"
                                    placeholder="Пароль"
                                    value={passwordLoc}
                                    onChange={e => handlePassword(e)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {passwordError}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form>
                    }
                </Modal.Body>
                :
                <ModalBody>
                    <Container fluid>
                        <Row>
                            <Col></Col>
                            <Col>
                                <img
                                    src={frog}
                                    alt="Error"
                                    style={{width: '200px', height: '200px'}}
                                />
                            </Col>
                            <Col></Col>
                        </Row>
                    </Container>
                </ModalBody>
            }

            {!alertMessage ? <Modal.Footer>
                {passwordMatch ?
                    <Button onClick={changePassword}>Сменить пароль</Button>
                    :
                    <Button onClick={passwordCheck}>Проверить</Button>
                }
            </Modal.Footer> : null}
        </Modal>
    );
}

const Profile = observer(() => {
    const [userLoc, setUserLoc] = useState(undefined)
    const [username, setUsername] = useState(undefined)
    const [usernameError, setUsernameError] = useState(null)

    const [image, setImage] = useState(undefined)
    const [imageError, setImageError] = useState(null)

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

    const usernameHandler = (e) => {
        setUsername(e.target.value)
        if (isEmpty(e.target.value)) {
            setUsernameError("Пожалуйста введите имя пользователя")
        } else {
            setUsernameError(null)
        }
    }

    const handleEditing = () => {
        setEditing(true)
    }

    const handleSave = () => {
        if (contactsLoc.filter(i => isEmpty(i.name) || isEmpty(i.contact)).length) {
            setContactsError("Контакты не могут быть пустыми")
            return
        }
        if (isEmpty(username)) {
            setUsernameError("Пожалуйста введите имя пользователя")
            return
        }
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
            updateData(formData).then(data => setUserLoc(data)).catch(e => setImageError(e.response.data.message))
            setImage(null)
        }
        if (contactsLoc) {
            updateContacts(contactsLoc).then(data => setContacts(data))
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
                <Col lg={5} md={7} sm={10} xl={4} xs={10}>
                    <Form>
                        {userLoc && userLoc.image ?
                            <div className="perImageBorder">
                                <Image
                                    fluid
                                    className="perImage"
                                    src={process.env.REACT_APP_API_URL + userLoc.image}
                                />
                            </div>
                            : <div>У пользователя нет картинки :(</div>
                        }

                        {isEditing ?
                            <Form.Control
                                className="mt-3"
                                size={"sm"}
                                type="file"
                                onChange={selectFile}
                            /> :
                            <div className="invisible">
                                <Form.Control
                                    className="mt-3"
                                    size={"sm"}
                                />
                            </div>}
                    </Form>
                </Col>

                <Col xs={6} className="blockPersonal">
                    <div className="forPersonal2">
                        {userLoc && userLoc.username ?
                            (isEditing
                                ? (
                                    <InputGroup hasValidation>
                                        <Form.Control
                                            required
                                            isInvalid={!!usernameError}
                                            type="text"
                                            value={username}
                                            onChange={(event) => usernameHandler(event)}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {usernameError}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                )
                                : (<h3 className="perText">{userLoc.username}</h3>))
                            : null
                        }
                    </div>

                    <Row>
                        <div className="forPersonal2">
                            {userLoc && userLoc.email ? <h4 className="perText">Email: {userLoc.email}</h4> : null}
                        </div>

                        {isEditing && user.user.id === id ?
                            <Col className="blockPersonal">
                                <Button
                                    style={{float: 'right'}}
                                    className="perButton"
                                    variant="success"
                                    onClick={() => setModalShow(true)}
                                >Сменить пароль</Button>
                            </Col> : null}
                    </Row>

                    <div className="forPersonal2">
                        <h5>Контакты:</h5>
                        {contactsLoc ?
                            (isEditing
                                    ? (
                                        <Form>
                                            {contactsLoc.map(i => (
                                                <Row key={i.id} className="perRow">
                                                    <Col xl={3}>
                                                        <InputGroup hasValidation>
                                                            <Form.Control
                                                                value={i.name}
                                                                onChange={(e) => changeContactLoc('name', e.target.value, i.id)}
                                                                required
                                                                isInvalid={isEmpty(i.name) && !!contactsError}
                                                                placeholder={"Название"}
                                                            />
                                                        </InputGroup>
                                                    </Col>
                                                    <Col xl={6}>
                                                        <InputGroup hasValidation>
                                                            <Form.Control
                                                                value={i.contact}
                                                                onChange={(e) => changeContactLoc('contact', e.target.value, i.id)}
                                                                required
                                                                isInvalid={isEmpty(i.contact) && !!contactsError}
                                                                placeholder={"Контакт"}
                                                            />
                                                        </InputGroup>
                                                    </Col>
                                                    <Col xl={3}>
                                                        <Button
                                                            className="perButton"
                                                            variant="success"
                                                            type="submit"
                                                            onClick={() => removeContactLoc(i.id)}
                                                        >
                                                            Удалить
                                                        </Button>
                                                    </Col>
                                                </Row>

                                            ))}

                                            {contactsError ?
                                                <Form.Label style={{color: 'red'}}>{contactsError}</Form.Label> : null}

                                            <Button
                                                style={{float: 'right'}}
                                                className="perButton"
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
                        <label>
                            {isEditing ? (
                                    <Button
                                        className="perButton"
                                        variant="success"
                                        onClick={handleSave}
                                    >Сохранить</Button>)
                                : (
                                    <Button
                                        className="perButton"
                                        variant="success"
                                        onClick={handleEditing}
                                    >Редактировать</Button>
                                )}
                        </label>
                        : null}
                </Col>
            </Row>

            <ChangePasswordModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />

            <Row>
                <h2 className="perHead">Ваши объявления</h2>
                {Array.isArray(adsLoc) && adsLoc.map(i => (
                    i.userId === id ? (
                        <AdItem key={i.id} ad={i}/>
                    ) : null
                ))}
            </Row>

            <ToastContainer
                className="p-3"
                position={'bottom-end'}
            >
                <Toast
                    onClose={() => setImageError(null)}
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
})

export default Profile;