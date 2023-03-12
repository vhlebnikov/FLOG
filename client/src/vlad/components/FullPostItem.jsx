import React, {useState} from 'react';
import cl from "../../components/MyModal/MyModal.module.css";
import cross from "./Pictures/cross.png"

const FullPostItem = ({visible, setVisible, post}) => {
    const [index, setIndex] = useState(0)
    const rootClasses = [cl.myModal]
    if(visible){
        rootClasses.push(cl.active)
    }

    const close = () => {setVisible(false)}

    const change = () => {
        if(index === post.cnt - 1){
            setIndex(0)
        } else {
            setIndex(index + 1)
        }
    }

    if (post.cnt > 0) {
        return (
            <div>
                <img src={cross} onClick={close} height="20" width="27" alt={cross} className="cross"/>
                <h1>{post.title}</h1>
                <img src={URL.createObjectURL(post.images[index][0])} alt="" height="200px" onClick={change}/>
                <div>
                    <h4>Описание</h4>
                    <h5>{post.body}</h5>
                </div>
                <h4>Место: {post.place}</h4>
                <h4>Цена: {post.cost} &#8381;</h4>
            </div>
        );
    } else {
        return (
            <div>
                <img src={cross} onClick={close} height="20" width="27" alt={cross} className="cross"/>
                <h1>{post.title}</h1>
                <div>
                    <h4>Описание</h4>
                    <h5>{post.body}</h5>
                </div>
                <h4>Место: {post.place}</h4>
                <h4>Цена: {post.cost} &#8381;</h4>
            </div>
        );
    }
};

export default FullPostItem;