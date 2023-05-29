import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {ListGroup} from "react-bootstrap";
import CategoryCascader from "./CategoryCascader";
import {Button, CheckPicker, Input, InputGroup, InputNumber} from "rsuite";

const TypeBar = observer(() => {
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
        <ListGroup>
            <ListGroup.Item>
                <Input
                    value={subString}
                    onChange={setSubstring}
                    placeholder="Поиск по названию и описанию"
                />
            </ListGroup.Item>
            <ListGroup.Item>
                <CategoryCascader others={[selectedCategory, setSelectedCategory]}/>
            </ListGroup.Item>
            <ListGroup.Item>
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
                    <InputGroup.Addon >до</InputGroup.Addon>
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
            </ListGroup.Item>
            <ListGroup.Item>
                <CheckPicker
                    style={{width: "224px"}}
                    placeholder={"Статус"}
                    searchable={false}
                    data={statusData}
                    value={status}
                    onChange={setStatus}
                />
            </ListGroup.Item>
            <ListGroup.Item>
                <Button
                    className="btn-expensive"
                    onClick={() => setSubmit(!submit)}
                >
                    Применить
                </Button >
            </ListGroup.Item>
            <ListGroup.Item>
                <Button
                    className="btn-expensive"
                    style={{width: "130px"}}
                    onClick={resetFilters}
                >
                    Сброс фильтров
                </Button >
            </ListGroup.Item>

        </ListGroup>

    );
});

export default TypeBar;