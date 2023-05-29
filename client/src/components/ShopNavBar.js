import React, {useContext, useEffect, useState} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import CategoryCascader from "./CategoryCascader";
import {CheckPicker, Input, InputGroup, InputNumber} from "rsuite";
import SearchIcon from '@rsuite/icons/Search';
import {Col, Nav, Row} from "react-bootstrap";

const ShopNavBar = observer(() => {
    const {filter} = useContext(Context)
    const [selectedCategory, setSelectedCategory] = useState(filter.category);

    const [subString, setSubstring] = useState("")

    const [status, setStatus] = useState([])
    const statusData = ['Открыто', 'Забронировано', 'Закрыто'].map((item, index) => ({label: item, value: index + 1}))

    const [price, setPrice] = useState([])

    const [submit, setSubmit] = useState(false)

    useEffect(() => {
        setPrice([0, 0])
    }, [])

    useEffect(() => {
        filter.setCategory(selectedCategory)
        filter.setStatus(status)
        filter.setPrice(price)
        filter.setSubstring(subString)
    }, [submit])

    const resetFilters = () => {
        setSelectedCategory(null)
        setSubstring("")
        setStatus([])
        setPrice([0, 0])
        filter.setCategory(null)
        filter.setStatus(null)
        filter.setPrice(null)
        filter.setSubstring(null)
    }

    return (
        <Navbar expand="lg" className="mt-3 shadow-box shopNavBar ">
            <Container fluid>
                <Nav className="my-2">
                    <CategoryCascader others={[selectedCategory, setSelectedCategory]}/>
                </Nav>

                <Nav>
                    <InputGroup>
                        <InputNumber
                            min={0}
                            value={price[0]}
                            onChange={nextValue => {
                                const [start, end] = price;
                                if (nextValue > end) {
                                    return;
                                }
                                setPrice([Number(nextValue), end]);
                            }}
                        />
                        <InputGroup.Addon>до</InputGroup.Addon>
                        <InputNumber
                            min={0}
                            value={price[1]}
                            onChange={nextValue => {
                                const [start, end] = price;
                                if (start > nextValue) {
                                    return;
                                }
                                setPrice([start, Number(nextValue)]);
                            }}
                        />
                    </InputGroup>
                </Nav>

                <Nav>
                    <CheckPicker
                        placeholder={"Статус"}
                        searchable={false}
                        data={statusData}
                        value={status}
                        onChange={setStatus}
                    />
                </Nav>

                <Nav>
                    <InputGroup>
                        <Input
                            value={subString}
                            onChange={setSubstring}
                        />
                        <InputGroup.Button
                            onClick={() => setSubmit(!submit)}
                        >
                            <SearchIcon/>
                        </InputGroup.Button>
                        <InputGroup.Button
                            onClick={resetFilters}
                        >
                            Сброс фильтров
                        </InputGroup.Button>
                    </InputGroup>
                </Nav>
            </Container>
        </Navbar>
    );
});

export default ShopNavBar;