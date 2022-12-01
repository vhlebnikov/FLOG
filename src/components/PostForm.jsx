import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const PostForm = ({create}) => {
    const [post, setPost] = useState({title: '', body: '', cost: '' ,pDate: new Date()})
    const [date, setDate] = useState(new Date())
    const addNewPost = (e) => {
        e.preventDefault()
        const newPost = {
            ...post, id: Date.now()
        }
        create(newPost)
        setPost({title: '', body: '', cost: '', pDate: new Date()})

    }
    const clearPost = (e) => {
        e.preventDefault()
        setPost({title: '', body: '', cost: '', pDate: new Date()})
    }

    const changeDate = (date, post) => {
        setDate(date)
        setPost({...post, pDate: date})
    }

    return (
        <form>
            <div className = "heading">
                Новое объявление
            </div>
            <MyInput
                value={post.title}
                onChange={e => setPost({...post, title: e.target.value})}
                type="text"
                placeholder="Название"
            />
            <MyInput
                value = {post.body}
                onChange={e=>setPost({...post, body: e.target.value})}
                type="text"
                placeholder="Описание"
            />
            <MyInput
                value={post.cost}
                onChange={e => setPost({...post, cost: e.target.value})}
                type="text"
                placeholder="Стоимость"
            />
            <DatePicker
                placeholderText = "Дата"
                selected = {post.pDate}
                onChange = {changeDate}
            />
            <MyButton onClick={addNewPost}>Создать пост</MyButton>
            <MyButton onClick={clearPost}>Очистить поля</MyButton>
        </form>
    );
};

export default PostForm;