import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "../componentcss/addpostform.css"

interface Post {
    title: string;
    body: string;
    user_id: number;
    id: number;
    recommend: number;
    unrecommend: number;
    created_at: string;
    updated_at: string;
    category: string;
}

const POSTS_API_URL = "https://exchange-forum-rails-backend.onrender.com/posts";

function getPostApiData() {
    return axios.get(POSTS_API_URL).then((response) => response.data);
}


function EditPostForm() {

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [body, setBody] = useState('');
    const [posts, setPosts] = useState([{
        title: "",
        body: "",
        category: "",
        user_id: 0,
        id: 0,
        recommend: 0,
        unrecommend: 0,
        created_at: 0,
        updated_at: 0,
    }]);

    // Retrieve Posts from db
    useEffect(() => {
        let mounted = true;
        getPostApiData().then((items) => {
            if (mounted) {
                setPosts(items);
            }
        });

        return () => {
            mounted = false;
        }
    }, []);

    function editpost() {

        const SPECIFIC_POSTS_API_URL = "https://exchange-forum-rails-backend.onrender.com/posts/" + post_id;

        // Post the post data to the rails db
        axios.put<Post>(SPECIFIC_POSTS_API_URL,
            {
                title: title,
                body: body,
                category: category,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            },
        );


        // Reset states back to original blank states
        resetState();

        // Redirect back to homepage
        navigate("/");
    }

    function resetState() {
        setTitle('');
        setBody('');
        setCategory('');
    }

    const navigate = useNavigate();
    const post_id = Number(sessionStorage.getItem('commentpost'))


    return (
        <div>
            <h1 className='postformtitle'>Edit Post</h1>
            <form>
                <div className='newposttitle'>Title:</div>
                <input
                    className='formtitle'
                    type="text"
                    name="Title"
                    onChange={(e) => setTitle(e.target.value)}
                    defaultValue={posts.find(post => post.id === post_id)?.title}
                    required
                />
                <div className='newpostbody'>
                    Category:</div>
                <select
                    className='category'
                    name='category'
                    onChange={(e) => setCategory(e.target.value)}
                    required
                >
                    <option value="Summer Exchange Programme" selected>Summer Exchange Programme</option>
                    <option value="Winter Exchange Programme">Winter Exchange Programme</option>
                    <option value="Overseas Exchange Programme">Overseas Exchange Programme</option>
                    <option value="NUS Overseas College">NUS Overseas College</option>

                </select>
                <div className='newpostbody'>
                    Body:</div>
                <textarea
                    className='formbody'
                    name="Body"
                    onChange={(e) => setBody(e.target.value)}
                    defaultValue={posts.find(post => post.id === post_id)?.body}
                    required
                />

                <br />
                <br />

                <button
                    type='submit'
                    className='submitbutton'
                    onClick={(e) => editpost()}
                >Edit Post</button>
            </form>
        </div>
    )
}

export default EditPostForm