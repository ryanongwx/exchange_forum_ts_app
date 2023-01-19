import React from 'react'
import '../componentcss/navmenu.css'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import Homepage from "./Homepage"
import SignIn from './SignIn'
import AddUserForm from './AddUserForm'
import AddCommentForm from './AddCommentForm'
import Account from './Account'
import EditPostForm from './EditPostForm'
import AddPostForm from './AddPostForm'
import Categories from './Categories'


// React functional component
const Navmenu: React.FC<{}> = () => {

  const username :string= sessionStorage.getItem('username')?.toString()!;
  const token = sessionStorage.getItem('token');

  if (token) {
    return (
      <Router>
        <nav className="navmenu">
          <Link className="menulinks" to={'/'}>
            Home
          </Link>
          <Link className="menulinks" to={'/categories'}>
            Categories
          </Link>
          <Link className="menulinks" to={'/favourites'}>
            Favourites
          </Link>
          <Link className="menulinks" to={'/yourposts'}>
            Your Posts
          </Link>
          <Link className="menulinks" to={'/account'}>
            Account
          </Link>
          <Link className="addpostbutton" to={'/addpost'}>
            Add Post
          </Link>
          <Link className="menubutton" to={'/'}>
            { "Welcome, " + username.replace(/['"]+/g, '') }
          </Link>
        </nav>
        <Routes>
          <Route path='/' element= { <Homepage /> }/>
          <Route path='/addpost' element= { <AddPostForm /> }/>
          <Route path='/signin' element= { <SignIn /> }/>
          <Route path='/createuser' element= { <AddUserForm /> } />
          <Route path='/yourposts' element= { <Homepage /> } />
          <Route path='/addcomment' element = { <AddCommentForm /> } />
          <Route path='/account' element = { <Account /> } />
          <Route path='/editpost' element = { <EditPostForm /> } />
          <Route path='/favourites' element = { <Homepage /> } />
          <Route path='/categories/' element = { <Categories /> } />
          <Route path='/categories/:string' element = { <Categories /> } />
        </Routes>
        
      </Router>
      
    )
  } else {
    return (
      <Router>
        <nav className="navmenu">
          <Link className="menulinks" to={'/'}>
            Home
          </Link>
          <Link className="menulinks" to={'/categories'}>
            Categories
          </Link>
          <Link className="menulinks" to={'/yourposts'}>
            Your Posts
          </Link>
          <Link className="menulinks" to={'/account'}>
            Account
          </Link>
          <Link className="addpostbutton" to={'/addpost'}>
            Add Post
          </Link>
          <Link className="menubutton" to={'/signin'}>
            Sign In
          </Link>
        </nav>
        <Routes>
          <Route path='/' element= { <Homepage /> }/>
          <Route path='/signin' element= { <SignIn /> }/>
          <Route path='/createuser' element= { <AddUserForm /> } />
        </Routes>

      </Router>
      
    )
  }

  
}

export default Navmenu