import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Users from './components/users'
import Posts from './components/posts';
import Navmenu from './NavigationMenu/navmenu';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
interface User {
  bio: string;
  image_id: string;
  id: number
  password: string;
  username:string
}


const USERS_API_URL = "http://localhost:3000/users";

function getUserApiData() {
  return axios.get(USERS_API_URL).then((response) => response.data);
}

function postUserApiData(payload: User) {
  // console.log("failed");
  // axios.post<User>(
  //   USERS_API_URL,
  //   { bio: "Posted from Reat JS",
  //     image_id: "Posted from Reat JS",
  //     password: "reactjs",
  //     },
  //   {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Accept: 'application/json',
  //     },
  //   },
  // );
  return;
}

function App() {
  const [users, setUsers] = useState([]);
  
  
  useEffect(() => {
    let mounted = true;
    getUserApiData().then((items) => {
      if (mounted) {
        console.log("suceed");
        setUsers(items);
      }
    });
    return () => {
      mounted = false;
    }
  }, []);

  

  return (
    <div className="App">
      <Navmenu />
      
      {/* <Users users={users} />
      <Comments comments={comments} /> */}
    </div>

  );
};

export default App;
