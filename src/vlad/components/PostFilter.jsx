import React from 'react';
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/MySelect";
import {Form} from "react-bootstrap";

const PostFilter = ({filter, setFilter}) => {
    return (
        <Form className="d-flex justify-content-between mt-3">
            <div>
                <MyInput
                         placeholder = "Поиск"
                         value = {filter.query}
                         onChange = {e => setFilter({...filter, query: e.target.value})}
                />
            </div>
            <div>
                <MySelect
                          value={filter.sort}
                          onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
                          defaultValue="Сортировка"
                          options={[
                              {value: 'title', name: 'По названию'},
                              {value: 'body', name: 'По описанию'}
                          ]}
                />
            </div>
        </Form>
    );
};

export default PostFilter;