//import React, { Component } from 'react'
import React, {useMemo, useRef, useState, Component} from "react";
import '../components/App.css'
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import {usePosts} from "../hooks/usePosts";


function Adds() {

    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '',query: ''})
    //const [modal, setModal] = useState(false)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

    /*
    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    } */
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }
    return(
        <div className="Album">
            <br/>
            <hr style={{margin: '15px 0'}}/>
            <PostFilter filter = {filter} setFilter={setFilter}/>

            <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Список постов"/>

        </div>
    )
}

export default Adds