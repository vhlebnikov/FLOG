import React, {useState} from 'react';
import MyModal from "../components/MyModal/MyModal";
import PostForm from "../vlad/components/PostForm";
import PostFilter from "../vlad/components/PostFilter";
import PostList from "../vlad/components/PostList";
import {usePosts} from "../vlad/hooks/usePosts";
import {Container} from "react-bootstrap";

const Shop = () => {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    const [modal, setModal] = useState(false)

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    const changePost = (editPost) => {
        const copy = posts
        copy.map((post) => {
            if (editPost.id === post.id) {
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
    return (
        <Container className="Album">
            <MyModal visible={modal}>
                <PostForm create={createPost} visible={modal} setVisible={setModal}/>
            </MyModal>
            <PostFilter filter={filter} setFilter={setFilter}/>
            <PostList remove={removePost} posts={sortedAndSearchedPosts} setPosts={changePost}
                      title="Список объявлений"/>
        </Container>
    )
};

export default Shop;