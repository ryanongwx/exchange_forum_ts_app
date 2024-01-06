import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "../componentcss/signin.css"
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';



function SignIn() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [allusers, setUsers] = useState([{
        bio: "",
        image_id: "",
        id: 0,
        password: "",
        username: "",
        token: "",
        created_at: "",
        updated_at: "",
    }]);

    const USERS_API_URL = "https://exchange-forum-rails-backend.onrender.com/users";

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


    function authenticate_user(user: any) {

        // Autheticate user by checking username and password with the db
        if (user.username === username && user.password === password) {
            //Set sessionStorage token
            sessionStorage.setItem('token', JSON.stringify(user.token));
            sessionStorage.setItem('username', JSON.stringify(user.username));
            sessionStorage.setItem('user_id', JSON.stringify(user.id));
        }
    }

    function signuserin(username: string, password: string) {
        // sign the user in based on its username and password
        const thisuser = allusers.find(user => user.username === username && user.password === password);
        authenticate_user(thisuser);
        toast("You have successfully signed in");
        navigate("/")
        window.location.reload();

    }

    return (
        <div>
            <h1 className='signinformtitle'>Sign in</h1>
            <Link className='createuserlink' to={'/createuser'}>Click here to create user if you do not have an account yet.</Link>
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

                <br />
                <br />
                <br />

                <button
                    type='submit'
                    className='signinbutton'
                    onClick={(e) => signuserin(username, password)}
                >Sign In</button>
            </form>
            <ToastContainer />
        </div>

    )
}

export default SignIn
