import React, {useState} from "react";
import './styles/App.css'
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import {usePosts} from "./hooks/usePosts";

function App() {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '',query: ''})
    const [modal, setModal] = useState(false)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
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
                //post.images.map((img,index) =>{
                  //  return editPost.images[index]
                //})
            }
            return post
        })
        setPosts(copy)
    }

    return (
        <div className="App">
            <MyButton style = {{marginTop: '30px'}} onClick = {() => setModal(true)}>
                Создать пост
            </MyButton>
            <MyModal visible={modal}>
                <PostForm create={createPost} visible={modal} setVisible= {setModal}/>
            </MyModal>
            <hr style={{margin: '15px 0'}}/>
            <PostFilter filter = {filter} setFilter={setFilter}/>
            <PostList remove={removePost} posts={sortedAndSearchedPosts} setPosts={changePost} title="Список постов"/>
        </div>
    );
}

export default App;
