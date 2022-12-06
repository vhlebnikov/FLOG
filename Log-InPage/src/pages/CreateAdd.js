import React, {useMemo, useRef, useState, Component} from "react";
import '../components/App.css'
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import {usePosts} from "../hooks/usePosts";

function CreateAdd () {

    const [posts, setPosts] = useState([])
    const [modal, setModal] = useState(false)

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    return (
        <div>
            <button style = {{marginTop: '30px'}} onClick = {() => setModal(true)}>
                Создать пост
            </button>
            <modal visible={modal} setVisible = {setModal}>
                <PostForm create={createPost}/>
            </modal>
        </div>
    );
};

export default CreateAdd;