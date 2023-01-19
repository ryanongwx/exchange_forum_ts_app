
import React from 'react'
import Posts from './Posts';


const token = sessionStorage.getItem('token');
function Index() {
  return (
    token
    ? <Posts />
    : <h1>Please Sign In</h1>
  )
}

export default Index