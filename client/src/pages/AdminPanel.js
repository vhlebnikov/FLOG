import React, {useEffect, useState} from 'react';
import Container from "react-bootstrap/Container";
import {InputGroup, Col, Form, Row, Card} from "react-bootstrap";
import CategoryCascader from "../components/CategoryCascader";
import {getCategoryRoute} from "../http/categoryApi";
import {Input} from "rsuite";
import Button from "react-bootstrap/Button";
import AdminCategoryCascader from "../components/AdminCategoryCascader";
import VerEx from "verbal-expressions";

const AdminPanel = () => {
    const [parentCategory, setParentCategory] = useState(null)
    const [createName, setCreateName] = useState(null)

    const [editCategory, setEditCategory] = useState(null)
    const [editName, setEditName] = useState("")
    const [editError, setEditError] = useState(null)

    const [deleteCategory, setDeleteCategory] = useState(null)

    const [editCategoryPlaceHolder, setEditCategoryPlaceHolder] = useState(null)

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

    const editNameHandler = (e) => {
        setEditName(e.target.value)
        if (isEmpty(e.target.value)) {
            setEditError("Введите название категории")
        } else {
            setEditError(null)
        }
    }

    return (
        <div>
            <Container className="my-3">
                    {/*<Row className="mb-3">*/}
                    {/*    <Col lg>*/}
                    {/*        <div style={{ display: 'flex', alignItems: 'center' }}>*/}
                    {/*            <h6 style={{marginRight:5}}>Создать подкатегорию для</h6>*/}
                    {/*            <AdminCategoryCascader others={[parentCategory, setParentCategory]}/>*/}
                    {/*        </div>*/}
                    {/*    </Col>*/}

                    {/*    {parentCategory ?*/}
                    {/*        <div>*/}
                    {/*            <Col lg>*/}
                    {/*                <Input/>*/}
                    {/*            </Col>*/}
                    {/*            <Col>*/}
                    {/*                <Button>Создать</Button>*/}
                    {/*            </Col>*/}
                    {/*        </div>*/}
                    {/*        :*/}
                    {/*        null*/}
                    {/*    }*/}

                    {/*</Row>*/}

                        <Form className="d-flex flex-column">
                            <Col className="mb-3">
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <h6 style={{marginRight:5}}>Редактировать</h6>
                                        <CategoryCascader others={[editCategory, setEditCategory]}/>
                                    </div>

                                    {editCategory ?
                                        <Row>
                                            <Form.Label>Введите новое название для выбранной категории</Form.Label>
                                            <InputGroup hasValidation>
                                                <Form.Control
                                                    className="mt-3"
                                                    placeholder={editCategoryPlaceHolder}
                                                    value={editName}
                                                    required
                                                    isInvalid={!!editError}
                                                    onChange={e => editNameHandler(e)}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {editError}
                                                </Form.Control.Feedback>
                                            </InputGroup>
                                        </Row>
                                        : null
                                    }
                            </Col>
                        </Form>


                    {/*<Row>*/}
                    {/*    <Col>*/}
                    {/*        <div style={{ display: 'flex', alignItems: 'center' }}>*/}
                    {/*            <h6 style={{marginRight:5}}>Удалить</h6>*/}
                    {/*            <CategoryCascader others={[deleteCategory, setDeleteCategory]}/>*/}
                    {/*        </div>*/}
                    {/*    </Col>*/}
                    {/*</Row>*/}
            </Container>
        </div>
    );
};

export default AdminPanel;