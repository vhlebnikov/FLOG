import React, {useContext, useState} from 'react';
import {Context} from "../index";
import ImageUploaderProfile from "../utils/ImageUploaderProfile";
import {Button, Col, Container, Row} from 'react-bootstrap';

const Profile = () => {
    const {user} = useContext(Context)
    const [isEditing, setEditing] = useState(false)
    const [nameLoc, setName] = useState('')
    const [emailLoc, setEmail] = useState('')
    const [numberLoc, setNumber] = useState('')
    const [addressLoc, setAddress] = useState('')

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
                <h1 className="header1">Персональные данные</h1>
                <Col xs={4}>
                <ImageUploaderProfile/>
                </Col>
                <Col xs={8} className="blockPersonal">
                    <br/>
                <div className="forPersonal">
                    Имя:
                    {isEditing
                        ? (<input className = "personalInput"
                                  type="text"
                                  value={user.name}
                                  onChange={(event) => setName(event.target.value)}/>)
                        : (<div>{user.name}</div>)}
                </div>
                <div className="forPersonal">
                    Email:
                    {isEditing
                        ? (<input className = "personalInput"
                                  type="text"
                                  value={user.email}
                                  onChange={(event) => setEmail(event.target.value)}/>)
                        : (<div>{user.email}</div>)}
                </div>
                <div className="forPersonal">
                    Телефон:
                    {isEditing
                        ? (<input className = "personalInput"
                                type="text"
                                value={user.number}
                                onChange={(event) => setNumber(event.target.value)}/>)
                        : (<div>{user.number}</div>)}
                </div>
                <div className="forPersonal">
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
                <h1 className="header1">Ваши объявления</h1>
            </Row>
        </Container>
    );
}

export default Profile;