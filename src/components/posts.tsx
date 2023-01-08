import React from 'react'
import "../componentcss/posts.css"
import Comments from './comments'
import axios from 'axios';
import { useState, useEffect } from 'react';
import recommendimage from "../images/recommend.png"
import unrecommendimage from "../images/unrecommend.png"


const COMMENTS_API_URL = "http://localhost:3000/comments";


function getCommentApiData() {
  return axios.get(COMMENTS_API_URL).then((response) => response.data);
}


interface User {
  bio: string;
  image_id: string;
  id: number
  password: string;
  created_at: string;
  updated_at: string;
}

interface Post {
    title: string;
    body: string;
    user: User;
    id: number;
    recommend: number;
    unrecommend: number;
    created_at: string;
    updated_at: string;
}

interface PostProps {
    posts: Post[];
}


function Posts(props: PostProps) {

  const [comments, setComments] = useState([]);

  useEffect(() => {
    let mounted = true;
    getCommentApiData().then((items) => {
      if (mounted) {
        setComments(items);
      }
    });
      
    return () => {
      mounted = false;
    }
  }, []);

  var hs = document.querySelector('.hs');
  const n = props.posts.length;
  hs?.setAttribute("style","grid-template-columns:repeat(" + n + ", calc(50% - 40px));");

  return (
    <div>
      
      <ul className="hs">
        
          {props.posts.map(post => 
            <li className='item'>
                <h2 className='posttitle'>{ post.id }.  { post.title }</h2>
                <div className='sidebyside'>
                  <h3 className='postdate'>{ post.created_at }</h3>
                  <div><div className='recommend'><img src={ recommendimage } alt='Recommend'></img> { post.recommend }
                                  <p>  </p>  
                                  <img src={ unrecommendimage } alt='Recommend'></img> { post.unrecommend }</div></div>
                </div>
                
                <p className='postbody'>{ post.body }</p>
                <Comments comments={comments} />
                
            </li>)}
      </ul>
    </div>
  )
}

export default Posts