import React from 'react'
import styles from './Navmenu.module.css'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import Index from "../components/Index"
import SignIn from '../components/SignIn'
import CreateUser from '../components/CreateUser'
import Youractivity from '../components/youractivity'
import AddCommentForm from '../components/AddCommentForm'
import Account from '../components/Account'
import EditPostForm from '../components/EditPostForm'
import Favourites from '../components/Favourites'
import AddPostForm from '../components/AddPostForm'


// React functional component
const Navmenu: React.FC<{}> = () => {

  const username :string= sessionStorage.getItem('username')?.toString()!;
  const token = sessionStorage.getItem('token');

  if (token) {
    return (
      <Router>
        <nav className={styles.navmenu}>
          <Link className={styles.menulinks} to={'/'}>
            Home
          </Link>
          <Link className={styles.menulinks} to={'/categories'}>
            Categories
          </Link>
          <Link className={styles.menulinks} to={'/favourites'}>
            Favourites
          </Link>
          <Link className={styles.menulinks} to={'/youractivity'}>
            Your Posts
          </Link>
          <Link className={styles.menulinks} to={'/account'}>
            Account
          </Link>
          <Link className={styles.addpostbutton} to={'/addpost'}>
            Add Post
          </Link>
          <Link className={styles.menubutton} to={'/'}>
            { "Welcome, " + username.replace(/['"]+/g, '') }
          </Link>
        </nav>
        <Routes>
          <Route path='/' element= { <Index /> }/>
          <Route path='/addpost' element= { <AddPostForm /> }/>
          <Route path='/signin' element= { <SignIn /> }/>
          <Route path='/createuser' element= { <CreateUser /> } />
          <Route path='/youractivity' element= { <Youractivity /> } />
          <Route path='/addcomment' element = { <AddCommentForm /> } />
          <Route path='/account' element = { <Account /> } />
          <Route path='/editpost' element = { <EditPostForm /> } />
          <Route path='/favourites' element = { <Favourites /> } />
        </Routes>
        
      </Router>
      
    )
  } else {
    return (
      <Router>
        <nav className={styles.navmenu}>
          <Link className={styles.menulinks} to={'/'}>
            Home
          </Link>
          <Link className={styles.menulinks} to={'/categories'}>
            Categories
          </Link>
          <Link className={styles.menulinks} to={'/youractivity'}>
            Your Posts
          </Link>
          <Link className={styles.menulinks} to={'/account'}>
            Account
          </Link>
          <Link className={styles.addpostbutton} to={'/addpost'}>
            Add Post
          </Link>
          <Link className={styles.menubutton} to={'/signin'}>
            Sign In
          </Link>
        </nav>
        <Routes>
          <Route path='/signin' element= { <SignIn /> }/>
          <Route path='/createuser' element= { <CreateUser /> } />
          
        </Routes>
        
      </Router>
      
    )
  }

  
}

export default Navmenu