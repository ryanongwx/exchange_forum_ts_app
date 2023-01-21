import axios from 'axios';
import React, { useEffect, useState } from 'react'
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

function getUserApiData() {
    return axios.get(USERS_API_URL).then((response) => response.data);
}


function EditUserForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [bio, setBio] = useState('');
    const [imageid, setimageid] = useState('');
    const [users, setUsers] = useState([ {
        bio: "",
        image_id: "",
        id: 0,
        password: "",
        token: "",
        username: "",
    }]);

    const navigate = useNavigate();
    const user_id = Number(sessionStorage.getItem('user_id'));

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

    function edituser() {

        const SPECIFIC_USERS_API_URL = "http://localhost:3000/users/" + user_id;
        // Post the user data to the rails db
        axios.put<User>( SPECIFIC_USERS_API_URL,
            {   bio: bio,
                image_id: imageid,
                password: password,
                username: username,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                Accept: 'application/json',
                },
            },
        );

        navigate("/")
    return ;
    }

  return (
    <div>
    <h1 className='createusertitle'>Update User Details</h1>
    <form>
        <div className='formtext'>Username:</div>
        <input 
            className='formentry'
            type="text"
            name="Username"
            onChange={(e) => setUsername(e.target.value)}
            defaultValue={users.find(user => user.id === user_id)?.username}
            required
        />
        <div className='formtext'>
        Password:</div>
        <input
            type="text" 
            className='formentry'
            name="Password"
            onChange={(e) => setPassword(e.target.value)}
            defaultValue={users.find(user => user.id === user_id)?.password}
            required
        />

        <div className='formtext'>
            Bio:</div>
            <input
                type="text" 
                className='formentry'
                name="Bio"
                onChange={(e) => setBio(e.target.value)}
                defaultValue={users.find(user => user.id === user_id)?.bio}
                required
        />

        <div className='formtext'>
            Image ID:</div>
            <input
                type="text" 
                className='formentry'
                name="Image"
                onChange={(e) => setimageid(e.target.value)}
                defaultValue={users.find(user => user.id === user_id)?.image_id}
                required
        />

        <br/>
        <br/>
        <br/>

        <button 
            type='submit'
            className='signinbutton'
            onClick={(e) => edituser()}
        >Edit User Details</button>
    </form>
</div>
  )
}

export default EditUserForm