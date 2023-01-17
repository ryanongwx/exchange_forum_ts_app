import axios from 'axios';
import React, { useState } from 'react'
import "../componentcss/addpostform.css"
import { useNavigate } from 'react-router-dom';

interface Comment {
    post_id: number;
    body: string;
    user_id: number;
    recommend: number;
    unrecommend: number;
    comment_id: number;
    created_at: string;
    updated_at: string;
}

const COMMENTS_API_URL = "http://localhost:3000/comments";

function AddCommentForm() {

    const [body, setBody] = useState('');

    const navigate = useNavigate();

    function submitnewcomment () {

        // Retrieve user_id from sessionStorage
        const user_id = Number(sessionStorage.getItem('user_id'));
        const post_id = Number(sessionStorage.getItem('commentpost'));

        
        // Post the post data to the rails db in the comments table
        axios.post<Comment>( COMMENTS_API_URL,
            { 
                body: body,
                user_id: user_id,
                post_id: post_id,
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

        resetState();
        navigate("/");
    }

    // Reset the states to their original blank values
    function resetState() {
        setBody('');
    }

  return (
    <div>
        <h1 className='postformtitle'>Create New Comment</h1>
        <form>
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
                onClick={(e) => submitnewcomment()}
            >Submit New Comment</button>
        </form>

    </div>
    
  )
}

export default AddCommentForm
