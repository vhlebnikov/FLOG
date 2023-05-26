import React, {useEffect, useState} from 'react';
import {Modal, Button, Col, Form, Row, Dropdown, InputGroup, ModalDialog,} from "react-bootstrap";
import CategoryCascader from "../components/CategoryCascader";

function AdEditModal(props) {
    const [name, nameHandler, description, descriptionHandler, address, addressHandler,
           status, getStatusText, statusHandler, imageHandler, priceLoc, priceLocHandler,
            addInfo, info, changeInfo, removeInfo, adUpdate, nameError, descriptionError,
             addressError, infoError, imageError, priceStartError, priceEndError, isEmpty, checkFields,
              categoryError, setCategoryError, selectedCategory, setSelectedCategory, categoryRoute] = props.others

    const [submit, setSubmit] = useState(false)

    useEffect(() => {
        if (!categoryError && !nameError && !descriptionError && !addressError && !infoError
        && !imageError && !priceStartError && !priceEndError) {
            setSubmit(true)
        } else {
            setSubmit(false)
        }
    }, [categoryError, nameError, descriptionError, addressError, infoError,
    imageError, priceStartError, priceEndError, props.show])

    const handleClick = () => {
        checkFields().then(data => {
            if (data) {
                adUpdate()
                props.handleClose()
            }
        })
    }

    return (
        <Modal show={props.show} onHide={props.handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Редактирование объявления</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <>
                    <InputGroup>
                        <Form.Group>
                            <Form.Label>Выберите категорию объявления</Form.Label>
                            <CategoryCascader others={[selectedCategory, setSelectedCategory, categoryRoute]}/>
                            {categoryError ? <Form.Label
                                style={{
                                    fontSize: 13,
                                    WebkitTextFillColor: "#dc3545"
                                }}
                            >
                                {categoryError}
                            </Form.Label> : null}
                        </Form.Group>
                    </InputGroup>
                </>

                <Form.Label>Название объявления</Form.Label>
                <InputGroup hasValidation>
                    <Form.Control value={name} onChange={e => nameHandler(e)} required isInvalid={!!nameError}/>
                    <Form.Control.Feedback type="invalid">
                        {nameError}
                    </Form.Control.Feedback>
                </InputGroup>

                <Form.Label>Описание</Form.Label>
                <InputGroup hasValidation>
                    <Form.Control value={description} onChange={descriptionHandler} required isInvalid={!!descriptionError}/>
                    <Form.Control.Feedback type="invalid">
                        {descriptionError}
                    </Form.Control.Feedback>
                </InputGroup>

                <Form.Label>Адрес</Form.Label>
                <InputGroup hasValidation>
                    <Form.Control value={address} onChange={addressHandler} required isInvalid={!!addressError}/>
                    <Form.Control.Feedback type="invalid">
                        {addressError}
                    </Form.Control.Feedback>
                </InputGroup>

                <Row>
                    <Form.Label>{`Статус: ${getStatusText(status)}`}</Form.Label>
                    <Button variant={"outline-dark"} style={{ marginTop:  '10px' }}
                            onClick={statusHandler}
                    >
                        Изменить статус
                    </Button>
                </Row>

                <Form.Label>Картинки</Form.Label>
                <Form.Control
                    className="mt-3"
                    type="file"
                    multiple
                    required
                    onChange={imageHandler}
                />


                <Dropdown className="mt-3">
                    <Dropdown.Toggle className="expensive-button" variant="success" >{"Выберите тип цены"}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => priceLocHandler('type', 0)}>{"Без цены"}</Dropdown.Item>
                        <Dropdown.Item onClick={() => priceLocHandler('type', 1)}>{"Определенная цена"}</Dropdown.Item>
                        <Dropdown.Item onClick={() => priceLocHandler('type', 2)}>{"Интервал"}</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                {priceLoc ?
                    (
                        <div>
                            {priceLoc.type === 0 ?
                                null
                                :
                                <Row>
                                    <Col md={4}>
                                        <InputGroup hasValidation>
                                            <InputGroup.Text className="mt-2">₽</InputGroup.Text>
                                            <Form.Control
                                                required
                                                isInvalid={!!priceStartError}
                                                value={priceLoc.start}
                                                onChange={(e) => priceLocHandler('start', e)}
                                                className="mt-2"
                                                placeholder="Цена"
                                            />
                                        </InputGroup>
                                    </Col>
                                    {priceLoc.type === 2 ?
                                        <Col md={4}>
                                            <InputGroup hasValidation>
                                                <InputGroup.Text className="mt-2">₽</InputGroup.Text>
                                                <Form.Control
                                                    required
                                                    isInvalid={!!priceEndError}
                                                    value={priceLoc.end}
                                                    onChange={(e) => priceLocHandler('end', e)}
                                                    className="mt-2"
                                                    placeholder="Конечная цена"
                                                />
                                            </InputGroup>
                                        </Col>
                                        :
                                        null
                                    }
                                </Row>
                            }
                        </div>
                    ) : (
                        <div className="spinner-border" role="status">
                            <span className="sr-only"/>
                        </div>
                    )}

                <Button
                    className="mt-3 btn-expensive"
                    variant="outline-success"
                    onClick={addInfo}
                >
                    Добавить новое свойство
                </Button>

                {info.map(i =>
                    <Row className="mt-4" key={i.id}>
                        <Col md={4}>
                            <InputGroup hasValidation>
                                <Form.Control
                                    required
                                    isInvalid={isEmpty(i.name) && !! !!infoError}
                                    value={i.name}
                                    onChange={(e) => changeInfo('name', e.target.value, i.id)}
                                    placeholder="Введите название свойства"
                                />
                            </InputGroup>
                        </Col>
                        <Col md={4}>
                            <InputGroup hasValidation>
                                <Form.Control
                                    required
                                    isInvalid={isEmpty(i.description) && !!infoError}
                                    value={i.description}
                                    onChange={(e) => changeInfo('description', e.target.value, i.id)}
                                    placeholder="Введите описание свойства"
                                />
                            </InputGroup>
                        </Col>
                        <Col md={4}>
                            <Button
                                className="btn-expensive"
                                onClick={() => removeInfo(i.id)}
                                variant={"outline-danger"}
                            >
                                Удалить
                            </Button>
                        </Col>
                    </Row>
                )}


            </Modal.Body>
            <Modal.Footer>

                <Button className="mt-3"
                        variant="outline-success btn-expensive"
                        onClick={handleClick}
                        disabled={!submit}
                >
                    Сохранить изменения
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
export default AdEditModal;