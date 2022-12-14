import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";
import cross from "./Pictures/cross.png"
import cl from "./UI/MyModal/MyModal.module.css";
import MySelect from "./UI/select/MySelect";
import MyFileInput from "./UI/MyFileInput/MyFileInput";
import ImgList from "./UI/ImgList/ImgList";

const PostFormEdit = ({edit, visible, setVisible, thisPost}) => {
    const [pos, setPos] = useState({...thisPost, images: thisPost.images})
    const [colorTitle, setColorTitle] = useState("green")
    const [colorCost, setColorCost] = useState("green")
    const [colorPlace, setColorPlace] = useState("green")
    const editPost = (e) => {
        e.preventDefault()
        if(valid()) {
            edit(pos)
            setColorTitle("green")
            setColorCost("green")
            setColorPlace("green")
            setVisible(false)
        }
        else {
            if(pos.title === '') {
                setColorTitle("red")
            } else {
                setColorTitle("green")
            }
            if(pos.cost === '') {
                setColorCost("red")
            } else {
                setColorCost("green")
            }
            if(pos.place === '') {
                setColorPlace("red")
            } else {
                setColorPlace("green")
            }
        }
    }
    const clear = (e) => {
        e.preventDefault()
        setColorTitle("green")
        setColorCost("green")
        setColorPlace("green")
        setPos({...pos, title: '', body: '', cost: '', category: '', place: '',cnt: 0 , images: []})
    }

    const valid = () => {
        return pos.title !== '' && pos.cost !== '' && pos.place !== '';
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
            <div className = "heading">
                ?????????? ????????????????????
            </div>
            <MyInput
                value={pos.title}
                onChange={e => setPos({...pos, title: e.target.value})}
                type="text"
                placeholder="????????????????"
                color = {colorTitle}
            />
            <MyInput
                value = {pos.body}
                onChange={e=>setPos({...pos, body: e.target.value})}
                type="text"
                placeholder="????????????????"
                color = "green"
            />
            <MyInput
                value={pos.cost}
                onChange={e => setPos({...pos, cost: e.target.value})}
                type="text"
                placeholder="??????????????????"
                color = {colorCost}
            />
            <MyInput
                value={pos.place}
                onChange={e => setPos({...pos, place: e.target.value})}
                type="text"
                placeholder="??????????"
                color = {colorPlace}
            />
            <ImgList imgs={pos.images} />
            <MyFileInput
                onChange = {(e) =>
                    setPos({...pos, cnt: pos.cnt + 1 , images: [...pos.images, e.target.files]})
                }
            />
            <MySelect
                value = {pos.category}
                onChange={selectedCategory => setPos({...pos, category: selectedCategory})}
                defaultValue="??????????????????"
                options={[
                    {value: '??????????????', name: '??????????????'},
                    {value: '??????????????', name: '??????????????'},
                    {value: '??????????????????????', name: '??????????????????????'},
                    {value: '????????????', name: '????????????'}
                ]}
            />
            <MyButton onClick={editPost}>?????????????????? ????????????????????</MyButton>
            <MyButton onClick={clear}>???????????????? ????????</MyButton>
        </form>
    );
};

export default PostFormEdit;