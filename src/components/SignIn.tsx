import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "../componentcss/signin.css"
import Users from './users';

interface User {
    bio: string;
    image_id: string;
    id: number
    password: string;
    username:string;
  }

function SignIn() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [allusers , setUsers] = useState([{
        bio: "",
        image_id: "",
        id: "",
        password: "",
        username:""
    }]);

    const USERS_API_URL = "http://localhost:3000/users";

    function getUserApiData() {
        return axios.get(USERS_API_URL).then((response) => response.data);
    }

    useEffect(() => {
        let mounted = true;
        getUserApiData().then((items) => {
        if (mounted) {
            setUsers(items);
        }
        });
        return () => {
            mounted = false;
            }
        }, []);

    function signuserin () {
        // sign the user in based on its username and password

    }

    function resetState() {
        setUsername('');
        setPassword('');
    }

  return (
    <div>
        <h1 className='signinformtitle'>Sign in</h1>
        <form>
            <div className='formusernametext'>Username:</div>
            <input 
                className='formusername'
                type="text"
                name="Username"
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <div className='formpasswordtext'>
            Password:</div>
            <input 
                type="text"
                className='formpassword'
                name="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            <br/>
            <br/>
            <br/>

            <button 
                type='submit'
                className='signinbutton'
                onClick={(e) => signuserin()}
            >Sign In</button>
        </form>
    </div>
    
  )
}

export default SignIn