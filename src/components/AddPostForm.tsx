import React, { useState } from 'react'
import "../componentcss/addpostform.css"

function AddPostForm() {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    function submitnewpost () {
        // to do
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