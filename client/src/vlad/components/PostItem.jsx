import React, {useState} from 'react';
import MyButton from "./UI/button/MyButton";
import MyModal from "./UI/MyModal/MyModal"
import FullPostItem from "./FullPostItem";
import PostFormEdit from "./PostFormEdit";

const PostItem = (props) => {
    const [modalItem,setModalItem] = useState(false)
    const [modalForm, setModalForm] = useState(false)

    if(props.post.cnt > 0) {
        return (
            <div className="post">
                <div className="post__content" onClick={() => setModalItem(true)}>
                    <h1>{props.post.title}</h1>
                    <img src={URL.createObjectURL(props.post.images[0][0])} alt="" height="150px"/>
                    <h4>Место: {props.post.place}</h4>
                    <h4>Цена: {props.post.cost} &#8381;</h4>
                </div>
                <div className="post__btns">
                    <MyButton onClick={() => props.remove(props.post)}>Удалить</MyButton>
                    <MyButton onClick={() => setModalForm(true)}>Редактировать</MyButton>
                </div>
                <MyModal visible={modalForm}>
                    <PostFormEdit edit={props.setPosts} visible={modalForm} setVisible={setModalForm}
                                  thisPost={props.post}/>
                </MyModal>
                <MyModal visible={modalItem}>
                    <FullPostItem visible={modalItem} setVisible={setModalItem} post={props.post}/>
                </MyModal>
            </div>
        );
    } else {
        return (
            <div className="post">
                <div className="post__content" onClick={() => setModalItem(true)}>
                    <h1>{props.post.title}</h1>
                    <h4>Место: {props.post.place}</h4>
                    <h4>Цена: {props.post.cost} &#8381;</h4>
                </div>
                <div className="post__btns">
                    <MyButton onClick={() => props.remove(props.post)}>Удалить</MyButton>
                    <MyButton onClick={() => setModalForm(true)}>Редактировать</MyButton>
                </div>
                <MyModal visible={modalForm}>
                    <PostFormEdit edit={props.setPosts} visible={modalForm} setVisible={setModalForm}
                                  thisPost={props.post}/>
                </MyModal>
                <MyModal visible={modalItem}>
                    <FullPostItem visible={modalItem} setVisible={setModalItem} post={props.post}/>
                </MyModal>
            </div>
        );
    }
};

export default PostItem;