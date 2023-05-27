import React, {useEffect, useState} from 'react';
import Container from "react-bootstrap/Container";
import {InputGroup, Col, Form, Row, Card, ListGroup} from "react-bootstrap";
import CategoryCascader from "../components/CategoryCascader";
import {addCategory, deleteCategory, getCategoryRoute, updateCategory} from "../http/categoryApi";
import Button from "react-bootstrap/Button";
import AdminCategoryCascader from "../components/AdminCategoryCascader";
import VerEx from "verbal-expressions";
import {getAllUsers, setRole} from "../http/userApi";
import {Input} from "rsuite";

const AdminPanel = () => {
    const [parentCategory, setParentCategory] = useState(null)
    const [createName, setCreateName] = useState("")
    const [createError, setCreateError] = useState(null)

    const [editCategory, setEditCategory] = useState(null)
    const [editName, setEditName] = useState("")
    const [editError, setEditError] = useState(null)
    const [editCategoryPlaceHolder, setEditCategoryPlaceHolder] = useState(null)

    const [delCategory, setDelCategory] = useState(null)

    const [users, setUsers] = useState([])

    const notEmptyRegExp = VerEx().startOfLine().something().endOfLine()
    const isEmpty = (word) => {
        const ans = !notEmptyRegExp.test(word)
        notEmptyRegExp.lastIndex = 0
        return ans
    }

    useEffect(() => {
        if (editCategory) {
            getCategoryRoute(editCategory).then(data => setEditCategoryPlaceHolder(data.pop().name))
        }
    }, [editCategory])

    useEffect(() => {
        getAllUsers().then(data => setUsers(data.rows))
    }, [])

    const createNameHandler = (e) => {
        setCreateName(e.target.value)
        if (isEmpty(e.target.value)) {
            setCreateError("Введите название категории")
        } else {
            setCreateError(null)
        }
    }

    const editNameHandler = (e) => {
        setEditName(e.target.value)
        if (isEmpty(e.target.value)) {
            setEditError("Введите название категории")
        } else {
            setEditError(null)
        }
    }

    const addCategoryHandler = () => {
        if (!createError && !isEmpty(createName)) {
            addCategory(parentCategory, createName).then(() => window.location.reload())
        } else {
            setCreateError("Введите название категории")
        }
    }

    const updateCategoryHandler = () => {
        if (!editError && !isEmpty(editName)) {
            updateCategory(editCategory, editName).then(() => window.location.reload())
        } else {
            setEditError("Введите название категории")
        }
    }

    const deleteCategoryHandler = () => {
        if (delCategory) {
            deleteCategory(delCategory).then(() => window.location.reload())
        }
    }

    const handleBan = (user) => {
        if (user.role !== 'BANNED') {
            setRole(user.id, "BANNED").then(() => window.location.reload())
        } else {
            setRole(user.id, "USER").then(() => window.location.reload())
        }
    }

    const handleRole = (user) => {
        if (user.role !== 'ADMIN') {
            setRole(user.id, "ADMIN").then(() => window.location.reload())
        } else {
            setRole(user.id, "USER").then(() => window.location.reload())
        }
    }

    return (
            <Container className="my-3 d-flex" style={{height: window.innerHeight - 350}}>
                <Row>
                    <Col md="auto">
                        <InputGroup className="mb-3" style={{ display: 'flex', alignItems: 'center' }}>
                            <h6 style={{marginRight:5}}>Создать подкатегорию для</h6>
                            <AdminCategoryCascader others={[parentCategory, setParentCategory]}/>
                        </InputGroup>

                        {parentCategory !== null ?
                            <>
                                <Form.Label className="mb-1">Введите новое название для выбранной категории</Form.Label>
                                <InputGroup className="mb-3" hasValidation>
                                    <Form.Control
                                        className="mt-3"
                                        placeholder={"Название категории"}
                                        value={createName}
                                        required
                                        isInvalid={!!createError}
                                        onChange={e => createNameHandler(e)}
                                    />
                                    <Button className="mt-3"
                                            variant="outline-success btn-expensive"
                                            onClick={addCategoryHandler}
                                    >
                                        Добавить
                                    </Button>
                                    <Form.Control.Feedback type="invalid">
                                        {createError}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </>
                            : null
                        }


                        <InputGroup className="mb-3" style={{ display: 'flex', alignItems: 'center' }}>
                            <h6 style={{marginRight:5}}>Редактировать</h6>
                            <CategoryCascader others={[editCategory, setEditCategory]}/>
                        </InputGroup>
                        {editCategory ?
                            <>
                                <Form.Label className="mb-1">Введите новое название для выбранной категории</Form.Label>
                                <InputGroup className="mb-3" hasValidation>
                                    <Form.Control
                                        className="mt-3"
                                        placeholder={editCategoryPlaceHolder}
                                        value={editName}
                                        required
                                        isInvalid={!!editError}
                                        onChange={e => editNameHandler(e)}
                                    />
                                    <Button className="mt-3"
                                            variant="outline-success btn-expensive"
                                            onClick={updateCategoryHandler}
                                    >
                                        Изменить
                                    </Button>
                                    <Form.Control.Feedback type="invalid">
                                        {editError}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </>
                            : null
                        }

                        <InputGroup className="mb-3" style={{ display: 'flex', alignItems: 'center' }}>
                            <h6 style={{marginRight:5}}>Удалить</h6>
                            <CategoryCascader others={[delCategory, setDelCategory]}/>
                        </InputGroup>
                        {delCategory ?
                            <Button className="mt-3"
                                    variant="outline-success btn-expensive"
                                    onClick={deleteCategoryHandler}
                            >
                                Удалить
                            </Button>
                            : null}
                    </Col>
                    <Col>
                        <h2>Назначение ролей пользователям</h2>
                            {users ?
                                (
                                    <ListGroup>
                                        {users.map(user => (
                                            <ListGroup.Item key={user.id}>
                                                <Row>
                                                    <Col md="auto">
                                                        {user.confirmed ?
                                                            <div style={{color: "#00dc08"}}>Confirmed</div>
                                                            : <div style={{color: "#da0000"}}>Unconfirmed</div>
                                                        }
                                                        <h6>id: {user.id} | role: {user.role}</h6>
                                                        <div>username: {user.username} | email: {user.email}</div>
                                                    </Col>
                                                    <Col xs lg="4">
                                                        {user.role !== 'BANNED' ?
                                                            <Button size="sm" variant="danger" onClick={() => handleBan(user)}>Забанить</Button>
                                                        :   <Button size="sm" variant="success" onClick={() => handleBan(user)}>Разбанить</Button>
                                                        }
                                                        {user.role !== 'ADMIN' ?
                                                            <Button size="sm" variant="warning" onClick={() => handleRole(user)}>Назначить админом</Button>
                                                        :   <Button size="sm" variant="warning" onClick={() => handleRole(user)}>Понизить до USER'а</Button>
                                                        }
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )
                            : null}
                    </Col>
                </Row>
            </Container>
    );
};

export default AdminPanel;