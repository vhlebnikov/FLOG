import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";
import cross from "./UI/MyModal/cross.png"
import cl from "./UI/MyModal/MyModal.module.css";
import MySelect from "./UI/select/MySelect";
import MyFileInput from "./UI/MyFileInput/MyFileInput";
import ImgList from "./UI/ImgList/ImgList";

const PostForm = ({create, visible, setVisible}) => {
    const [post, setPost] = useState({title: '', body: '', cost: '', category: '', place: '', images: []})
    const [colorTitle, setColorTitle] = useState("green")
    const [colorCost, setColorCost] = useState("green")
    const addNewPost = (e) => {
        e.preventDefault()
        if(valid()) {
            const newPost = {
                ...post, id: Date.now()
            }
            create(newPost)
            setPost({title: '', body: '', cost: '', category: '', place: '', images: []})
            setColorTitle("green")
            setColorCost("green")
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
        }
    }
    const clearPost = (e) => {
        e.preventDefault()
        setColorTitle("green")
        setColorCost("green")
        setPost({title: '', body: '', cost: '', category: '', place: '', images: []})
    }

    const valid = () => {
        return post.title !== '' && post.cost !== '';
    }

    const rootClasses = [cl.myModal]
    if(visible){
        rootClasses.push(cl.active)
    }

    const close = () => {
        setVisible(false)
        setColorTitle("green")
        setColorCost("green")
    }

    return (
        <form>
            <img src={cross} onClick={close} height="20" width="27" alt={cross} className = "cross"/>
            <div className = "heading">
                Новое объявление
            </div>
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
                color = {colorCost}
            />
            <ImgList imgs={post.images} />
            <MyFileInput
                onChange = {(e) =>
                    setPost({...post, images: [...post.images, e.target.files]})
                }
            />
            <MySelect
                value = {post.category}
                onChange={selectedCategory => setPost({...post, category: selectedCategory})}
                defaultValue="Категории"
                options={[
                    {value: 'buy', name: 'Продажа'},
                    {value: 'sell', name: 'Покупка'},
                    {value: 'event', name: 'Мероприятие'},
                    {value: 'service', name: 'Услуга'}
                ]}
            />
            <MyButton onClick={addNewPost}>Создать пост</MyButton>
            <MyButton onClick={clearPost}>Очистить поля</MyButton>
        </form>
    );
};

export default PostForm;