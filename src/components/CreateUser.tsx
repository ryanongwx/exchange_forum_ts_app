import React, { useState } from 'react'
import '../componentcss/createuserform.css'

function CreateUser() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [bio, setBio] = useState('');
    const [imageid, setimageid] = useState('');

    function registerUser() {
        // Post the data to the rails db
    }

  return (
    <div>
    <h1 className='createusertitle'>Create New Account</h1>
    <form>
        <div className='formtext'>Username:</div>
        <input 
            className='formentry'
            type="text"
            name="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
        />
        <div className='formtext'>
        Password:</div>
        <input
            type="text" 
            className='formentry'
            name="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
        />

        <div className='formtext'>
            Bio:</div>
            <input
                type="text" 
                className='formentry'
                name="Bio"
                onChange={(e) => setBio(e.target.value)}
                required
        />

        <div className='formtext'>
            Image ID:</div>
            <input
                type="text" 
                className='formentry'
                name="Image"
                onChange={(e) => setimageid(e.target.value)}
                required
        />

        <br/>
        <br/>
        <br/>

        <button 
            type='submit'
            className='signinbutton'
            onClick={(e) => registerUser()}
        >Create User</button>
    </form>
</div>
  )
}

export default CreateUser