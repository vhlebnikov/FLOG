import React, {useState} from "react";
import '../styles/App.css'
import PostList from "../components/PostList";
import PostFilter from "../components/PostFilter";
import {usePosts} from "../hooks/usePosts";
import PostForm from "../components/PostForm";
import MyButton from "../components/UI/button/MyButton"
import MyModal from "../components/UI/MyModal/MyModal"

function Adds() {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '',query: ''})
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    const [modal, setModal] = useState(false)

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    const changePost = (editPost) =>{
        const copy = posts
        copy.map((post) => {
            if(editPost.id === post.id){
                post.title = editPost.title
                post.place = editPost.place
                post.body = editPost.body
                post.cost = editPost.cost
                post.category = editPost.category
                post.cnt = editPost.cnt
                post.images = editPost.images
            }
            return post
        })
        setPosts(copy)
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }
    return(
        <div className="Album">
            <br/>
            <br/>
            <MyButton style = {{marginTop: '30px'}} onClick = {() => setModal(true)}>
                Создать объявление
            </MyButton>
            <MyModal visible={modal}>
                <PostForm create={createPost} visible={modal} setVisible={setModal}/>
            </MyModal>
            <br/>
            <hr style={{margin: '15px 0'}}/>
            <PostFilter filter = {filter} setFilter={setFilter}/>
            <PostList remove={removePost} posts={sortedAndSearchedPosts} setPosts={changePost} title="Список объявлений"/>
        </div>
    )
}

export default Adds