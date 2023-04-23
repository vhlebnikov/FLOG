import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import ImageUploaderProfile from "../dasha/ImageUploaderProfile";
import {Button, Col, Container, Row} from 'react-bootstrap';
import ImageUploader from "../dasha/ImageUploader";
import {useParams} from "react-router-dom";
import {getContacts, getUser} from "../http/userApi";

const Profile = () => {
    const {user} = useContext(Context)
    const [isEditing, setEditing] = useState(false)
    const [nameLoc, setName] = useState('')
    const [emailLoc, setEmail] = useState('')
    const [numberLoc, setNumber] = useState('')
    const [addressLoc, setAddress] = useState('')

    const [contacts, setContacts] = useState([])

    const params = useParams()
    const id = parseInt(params.id)

    useEffect(() => {
        getUser(id).then(data => user.setUser(data))
        getContacts(id).then(data => setContacts(data))
        console.log(contacts)
    }, [])

    const handleEditing = () => {
        setEditing(true)
    }

    const handleSave = () => {
        setEditing(false)
        user.setUser({
            name: nameLoc,
            email: emailLoc,
            number: numberLoc,
            address: addressLoc,
            password : user.password
        })
    }

    return (
        <Container className="personalMain">
            <Row>
                <h2 className="shit">Персональные данные</h2>
                <br/>
                <br/>
                <br/>
                <br/>
                <Col xs={3}>

                    <ImageUploader/>
                </Col>
                <Col xs={8} className="blockPersonal">
                    <br/>
                    <div className="forPersonal2">
                        Имя:
                        {isEditing
                            ? (<input className = "personalInput"
                                      type="text"
                                      value={user.name}
                                      onChange={(event) => setName(event.target.value)}/>)
                            : (<div>{user.user.username}</div>)}
                    </div>
                    <div className="forPersonal2">
                        Email:
                        {isEditing
                            ? (<input className = "personalInput"
                                      type="text"
                                      value={user.email}
                                      onChange={(event) => setEmail(event.target.value)}/>)
                            : (<div>{user.user.email}</div>)}
                    </div>
                    <div className="forPersonal2">
                        Контакты:
                        {isEditing
                            ? (<input className = "personalInput"
                                      type="text"
                                      value={user.number}
                                      onChange={(event) => setNumber(event.target.value)}/>)
                            : (<div>
                                <ul>
                                {contacts.map(contact => (
                                    <li key={contact.id}>
                                        <strong>{contact.name}</strong> {contact.contact}
                                    </li>
                                ))}
                                </ul>
                            </div>)}
                    </div>
                    <div className="forPersonal2">
                        Адрес:
                        {isEditing
                            ? (<input className = "personalInput"
                                      type="text"
                                      value={user.address}
                                      onChange={(event) => setAddress(event.target.value)}/>)
                            : (<div>{user.address}</div>)}
                    </div>
                    <label className="personalButton">
                        {isEditing ? (<Button variant="outline-success" onClick={handleSave}>Сохранить</Button>) : (<Button variant="outline-success" onClick={handleEditing}>Редактировать</Button>)}
                    </label>
                </Col>

            </Row>
            <Row className="d-flex flex-column m-3">
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <h2 className="shit">Ваши объявления</h2>
            </Row>
        </Container>
    );
}

export default Profile;