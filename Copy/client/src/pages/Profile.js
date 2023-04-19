import React, {useContext, useState} from 'react';
import {Context} from "../index";
import {Button, Col, Container, Row} from 'react-bootstrap';
import ImageUploader from "../dasha/ImageUploader";
import {useParams} from "react-router-dom";
import {getMyId, getUser} from "../http/userApi";


const Profile = () => {
    const [isEditing, setEditing] = useState(false)
    const [nameLoc, setName] = useState('')
    const params = useParams();
    const pageId = parseInt(params.id)
    const [id,setId] = useState(1)
    const [user,setU] = useState(useContext(Context))

    const handleEditing = () => {
        setEditing(true)
    }

    const getU = (uId) => {
        getUser(pageId).then(data => {
            setU(data)
        })
        return user
    }

    const changeId = () => {
        getMyId().then(data => {
            setId(data)
        })
        return id
    }

    const handleSave = () => {
        setEditing(false)
        user.setUser({
            username: nameLoc,
            id : user.id,
            email: user.email,
            password: user.password,
            confirmed: user.confirmed,
            activationLink: user.activationLink,
            role : user.role,
            createdAt : user.createdAt,
            updatedAt : user.updatedAt
        })
    }

    return (
        <Container className="personalMain">
            <Row>
                <h2 className="shit">Персональные данные</h2>
                <Col xs={4}>
                    <ImageUploader/>
                </Col>
                <Col xs={8} className="blockPersonal">
                    <div className="forPersonal2">
                        Имя:
                        {isEditing
                            ? (<input className = "personalInput"
                                      type="text"
                                      value={getU(pageId).username}
                                      onChange={(event) => setName(event.target.value)}/>)
                            : (<div>{getU(pageId).username}</div>)}
                    </div>
                    {changeId() === pageId ?
                        <label className="personalButton">
                            {isEditing ? (<Button variant="outline-success" onClick={handleSave}>Сохранить</Button>) : (
                                <Button variant="outline-success" onClick={handleEditing}>Редактировать</Button>)}
                        </label>
                        : <></>
                    }
                </Col>

            </Row>
            <Row className="d-flex flex-column m-3">
                <h2 className="shit">Ваши объявления</h2>
            </Row>

        </Container>
    );
}

export default Profile;