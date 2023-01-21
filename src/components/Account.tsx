import React, { useEffect, useState } from 'react'
import profilepic from '../images/profilepic.jpeg'
import '../componentcss/account.css'
import axios from 'axios';
import { Link } from 'react-router-dom';



const USERS_API_URL = "http://localhost:3000/users";

function getUserApiData() {
    return axios.get(USERS_API_URL).then((response) => response.data);
}

function Account() {

    const [users, setUsers] = useState([ {
        bio: "",
        image_id: "",
        id: 0,
        password: "",
        token: "",
        username: "",
    }]);
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

  return (
    <div>
        <img className='profileimage' src={ profilepic } alt="Profile Pic" />
        <div>
            <h1>{ users.find(user => user.id === user_id)?.username }</h1>
            <h2>{ users.find(user => user.id === user_id)?.bio }</h2>
            <br />
            <Link className="edituserbutton" to={'/edituser'}>
              Edit User Details
            </Link>
        </div>
    </div>
  )
}

export default Account