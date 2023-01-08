import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Posts from './posts';

const POSTS_API_URL = "http://localhost:3000/posts";

function getPostApiData() {
    return axios.get(POSTS_API_URL).then((response) => response.data);
  }

function Index() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
    let mounted = true;
    getPostApiData().then((items) => {
      if (mounted) {
        setPosts(items);
      }
    });
      
    return () => {
      mounted = false;
    }
  }, []);
  return (
    <Posts posts={posts} />
  )
}

export default Index