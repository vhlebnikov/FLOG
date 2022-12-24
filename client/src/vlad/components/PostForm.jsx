import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";
import cross from "./Pictures/cross.png"
import cl from "./UI/MyModal/MyModal.module.css";
import MySelect from "./UI/select/MySelect";
import MyFileInput from "./UI/MyFileInput/MyFileInput";
import ImgList from "./UI/ImgList/ImgList";
import {Form} from "react-bootstrap";
import "../styles/App.css";

const PostForm = ({create, visible, setVisible}) => {
    const [post, setPost] = useState({title: '', body: '', cost: '', category: '', place: '',cnt: 0 , images: []})
    const [colorTitle, setColorTitle] = useState("green")
    const [colorCost, setColorCost] = useState("green")
    const [colorPlace, setColorPlace] = useState("green")
    const addNewPost = (e) => {
        e.preventDefault()
        if(valid()) {
            const newPost = {
                ...post, id: Date.now()
            }
            create(newPost)
            setPost({title: '', body: '', cost: '', category: '', place: '',cnt: 0 , images: []})
            setColorTitle("green")
            setColorCost("green")
            setColorPlace("green")
        }
        else {
            if(post.title === '') {
                setColorTitle("red")
            } else {
                setColorTitle("green")
            }
            if(post.cost === '') {
                setColorCost("red")
            } else {
                setColorCost("green")
            }
            if(post.place === '') {
                setColorPlace("red")
            } else {
                setColorPlace("green")
            }
        }
    }
    const clearPost = (e) => {
        e.preventDefault()
        setColorTitle("green")
        setColorCost("green")
        setColorPlace("green")
        setPost({title: '', body: '', cost: '', category: '', place: '',cnt: 0 , images: []})
    }

    const valid = () => {
        return post.title !== '' && post.cost !== '' && post.place !== '';
    }

    const rootClasses = [cl.myModal]
    if(visible){
        rootClasses.push(cl.active)
    }

    const close = () => {
        setVisible(false)
        setColorTitle("green")
        setColorCost("green")
        setColorPlace("green")
    }

    return (
        <form>
            <img src={cross} onClick={close} height="20" width="27" alt={cross} className = "cross"/>
            <h2 className = "heading text-center my-2">
                Новое объявление
            </h2>
            <MyInput
                value={post.title}
                onChange={e => setPost({...post, title: e.target.value})}
                type="text"
                placeholder="Название"
                color = {colorTitle}
            />
            <MyInput
                value = {post.body}
                onChange={e=>setPost({...post, body: e.target.value})}
                type="text"
                placeholder="Описание"
                color = "green"
            />
            <MyInput
                value={post.cost}
                onChange={e => setPost({...post, cost: e.target.value})}
                type="text"
                placeholder="Стоимость"
                color = {colorCost}
            />
            <MyInput
                value={post.place}
                onChange={e => setPost({...post, place: e.target.value})}
                type="text"
                placeholder="Адрес"
                color = {colorPlace}
            />
            <Form className="d-flex justify-content-between mt-3">
                <MyFileInput
                    onChange = {(e) =>
                        setPost({...post, cnt: post.cnt + 1 , images: [...post.images, e.target.files]})
                    }
                />
                <ImgList imgs={post.images} />
            </Form>
            <Form className="d-flex justify-content-between mt-2">
                <MySelect
                    value = {post.category}
                    onChange={selectedCategory => setPost({...post, category: selectedCategory})}
                    defaultValue="Категории"
                    options={[
                        {value: 'Продажа', name: 'Продажа'},
                        {value: 'Покупка', name: 'Покупка'},
                        {value: 'Мероприятие', name: 'Мероприятие'},
                        {value: 'Услуга', name: 'Услуга'}
                    ]}
                />
                <MyButton onClick={addNewPost}>Создать пост</MyButton>
                <MyButton onClick={clearPost}>Очистить поля</MyButton>
            </Form>
        </form>
    );
};

export default PostForm;