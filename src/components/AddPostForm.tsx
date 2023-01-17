import axios from 'axios';
import React, { useState } from 'react'
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
}

const POSTS_API_URL = "http://localhost:3000/posts";


function AddPostForm() {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    
    const navigate = useNavigate();

    function submitnewpost () {

        // Retrieve user_id from sessionStorage
        const user_id = Number(sessionStorage.getItem('user_id'));

        // to do
        // Post the post data to the rails db
        axios.post<Post>( POSTS_API_URL,
            {   title: title,
                body: body,
                user_id: user_id,
                recommend: 0,
                unrecommend: 0,
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
    }

  return (
    <div>
        <h1 className='postformtitle'>Create New Post</h1>
        <form>
            <div className='newposttitle'>Title:</div>
            <input 
                className='formtitle'
                type="text"
                name="Title"
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <div className='newpostbody'>
            Body:</div>
            <textarea 
                className='formbody'
                name="Body"
                onChange={(e) => setBody(e.target.value)}
                required
            />

            <br/>
            <br/>

            <button 
                type='submit'
                className='submitbutton'
                onClick={(e) => submitnewpost()}
            >Submit New Post</button>
        </form>
    </div>
    
  )
}

export default AddPostForm