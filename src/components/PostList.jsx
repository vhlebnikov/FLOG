import React from 'react';
import PostItem from "./PostItem";

const PostList = ({posts, title, remove, setPosts}) => {

    if (!posts.length) {
        return (
            <h1 style={{textAlign: 'center'}}>
                Объявлений нет
            </h1>
        )
    }

    return (
        <div>
            <h1 style={{textAlign: 'center'}}>
                {title}
            </h1>
            {posts.map((post, index) =>
                <PostItem remove={remove} post={post} key={post.id} setPosts = {setPosts}/>
            )}

        </div>
    );
};

export default PostList;