import React from 'react'
import styles from './Navmenu.module.css'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import App from '../App'
import Users from '../components/users'
import Addpost from '../components/Addpost'
import index from '../components'
import Index from '../components'
import SignIn from '../components/SignIn'
import CreateUser from '../components/CreateUser'
import Youractivity from '../components/youractivity'

// React functional component
const Navmenu: React.FC<{}> = () => {
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
          Your Activity
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
        <Route path='/' element= { <Index /> }/>
        <Route path='/addpost' element= { <Addpost /> }/>
        <Route path='/signin' element= { <SignIn /> }/>
        <Route path='/createuser' element= { <CreateUser /> } />
        <Route path='/youractivity' element= { <Youractivity /> } />
      </Routes>
      
    </Router>
    
  )
}

export default Navmenu