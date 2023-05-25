import React, {useEffect, useState} from 'react';
import Container from "react-bootstrap/Container";
import {Breadcrumb, BreadcrumbItem, Col, Row} from "react-bootstrap";
import CategoryCascader from "../components/CategoryCascader";
import {getCategoryRoute} from "../http/categoryApi";
import {Input, InputGroup, Placeholder} from "rsuite";
import Button from "react-bootstrap/Button";
import AdminCategoryCascader from "../components/AdminCategoryCascader";

const AdminPanel = () => {
    const [newCategory, setNewCategory] = useState(null)
    const [editCategory, setEditCategory] = useState(null)
    const [deleteCategory, setDeleteCategory] = useState(null)
    const [newCategoryRoute, setNewCategoryRoute] = useState([])
    const [editCategoryRoute, setEditCategoryRoute] = useState([])
    const [deleteCategoryRoute, setDeleteCategoryRoute] = useState([])
    useEffect(() => {
        if (newCategory) {
            getCategoryRoute(newCategory).then(data => setNewCategoryRoute(data))
        }
        if (editCategory) {
            getCategoryRoute(editCategory).then(data => setNewCategoryRoute(data))
        }
        if (deleteCategory) {
            getCategoryRoute(deleteCategory).then(data => setNewCategoryRoute(data))
        }
    }, [newCategory, editCategory, deleteCategory])
    return (
        <div>
            <Container className="my-3">
                <Row className="mb-3">
                    <Col lg>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <h6 style={{marginRight:5}}>Создать подкатегорию для</h6>
                            <AdminCategoryCascader others={[newCategory, setNewCategory]}/>
                        </div>
                    </Col>
                    {newCategory === null ?
                        null
                        :
                        <div>
                            <Col lg>
                                {newCategoryRoute ? (
                                    <Breadcrumb>
                                        {newCategoryRoute.map(i => (
                                            <BreadcrumbItem key={i.id}>
                                                {i.name}
                                            </BreadcrumbItem>
                                        ))}
                                    </Breadcrumb>
                                ) : null}
                                <Input/>
                            </Col>
                            <Col>
                                <Button>Создать</Button>
                            </Col>
                        </div>

                    }

                </Row>
                <Row className="mb-3">
                    <Col lg>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <h6 style={{marginRight:5}}>Редактировать</h6>
                            <CategoryCascader others={[editCategory, setEditCategory]}/>
                        </div>
                    </Col>
                    <Col>
                        {editCategory === null ?
                            null
                            :
                            <Input/>
                        }
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <h6 style={{marginRight:5}}>Удалить</h6>
                            <CategoryCascader others={[deleteCategory, setDeleteCategory]}/>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AdminPanel;