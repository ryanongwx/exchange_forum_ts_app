import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../componentcss/createuserform.css'

interface User {
    bio: string;
    image_id: string;
    id: number;
    password: string;
    token: string;
    username: string
  }

const USERS_API_URL = "http://localhost:3000/users";

function makerandomtoken(length :number) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function CreateUser() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [bio, setBio] = useState('');
    const [imageid, setimageid] = useState('');

    const navigate = useNavigate();

    function registerUser() {

        // Generate random token of 20 characters
        const token = makerandomtoken(20);

        // Post the user data to the rails db
        axios.post<User>( USERS_API_URL,
            {   bio: bio,
                image_id: imageid,
                password: password,
                token: token,
                username: username,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                Accept: 'application/json',
                },
            },
        );

        navigate("/signin")
    return ;
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