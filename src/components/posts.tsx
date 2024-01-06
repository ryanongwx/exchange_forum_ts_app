import React from 'react'
import "../componentcss/posts.css"
import Comments from './Comments'
import axios from 'axios';
import { useState, useEffect } from 'react';
import recommendimage from "../images/recommend.png"
import unrecommendimage from "../images/unrecommend.png"
import favourite from "../images/favourite.png"
import unfavourite from "../images/unfavourite.png"
import { Link, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const COMMENTS_API_URL = "https://exchange-forum-rails-backend.onrender.com/comments";
const FAVOURITES_API_URL = "https://exchange-forum-rails-backend.onrender.com/favourites";
const POSTS_API_URL = "https://exchange-forum-rails-backend.onrender.com/posts";

function getCommentApiData() {
  return axios.get(COMMENTS_API_URL).then((response) => response.data);
}

function getFavouritesApiData() {
  return axios.get(FAVOURITES_API_URL).then((response) => response.data);
}

function getPostApiData() {
  return axios.get(POSTS_API_URL).then((response) => response.data);
}

interface Post {
  title: string;
  body: string;
  user_id: number;
  id: number;
  recommend: number;
  unrecommend: number;
  created_at: string;
  updated_at: string;
  category: string;
}

interface Favourite {
  id: number;
  post_id: number;
  user_id: number;
}

const user_id = Number(sessionStorage.getItem('user_id'));

function Posts() {
  // Determines the horizontal scroll post view
  const [comments, setComments] = useState([{
    post_id: 0,
    body: "",
    user_id: 0,
    recommend: 0,
    unrecommend: 0,
    id: 0,
    created_at: "",
    updated_at: "",
  }]);
  const [favourites, setFavourites] = useState<Favourite[]>();
  const location = useLocation();
  const [posts, setPosts] = useState<Post[]>();

  // Retrieve comments from db
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

  // Retrieve favourites from db
  useEffect(() => {
    let mounted = true;
    getFavouritesApiData().then((items) => {
      if (mounted) {
        setFavourites(items);
      }
    });

    return () => {
      mounted = false;
    }
  });

  // Retrieve Posts from db
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
  });

  // Setting the number of columns of the horizontal scroll in css file
  var hs = document.querySelector('.hs');
  const n = posts?.length;
  hs?.setAttribute("style", "grid-template-columns:repeat(" + n + ", calc(50% - 150px));");

  function recordPost(id: number) {
    // Logs the corresponding post_id so that the correct post is commented on

    sessionStorage.setItem('commentpost', id.toString());
  }

  function deletepost(id: number) {
    // Deletes post from rails db

    const POSTS_API_URL = "https://exchange-forum-rails-backend.onrender.com/posts/" + id;
    axios.delete(POSTS_API_URL);

  }

  function addrecommend(instruction: string, id: number, count: number) {
    // Alters recommend field in POSTS DB 

    const POSTS_API_URL = "https://exchange-forum-rails-backend.onrender.com/posts/" + id;
    const updated_count = count + 1;

    if (instruction === "recommend") {
      // Record recommend to rails db
      toast("Post Recommended.");
      axios.put<Comment>(POSTS_API_URL,
        {
          recommend: updated_count,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );

    } else {
      // Record unrecommend to rails db

      toast("Post Unrecommendedd.");
      axios.put<Comment>(POSTS_API_URL,
        {
          unrecommend: updated_count,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );

    }
  }

  function addfavourite(post_id: number) {
    // Adds Favourite entry to DB

    const favourite_id = favourites?.find(favourite => favourite.post_id === post_id && favourite.user_id === user_id);
    console.log(favourite_id);

    // Verifying whether the entry is already in the DB
    if (favourite_id === undefined) {
      axios.post<Favourite>(FAVOURITES_API_URL,
        {
          post_id: post_id,
          user_id: user_id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );

      toast("Post Added to Favourites");
    } else {
      toast("Post is already in Favourites");
    }
  }

  function deletefavourite(id: number) {
    // Deletes post from rails db

    // Find the favourite id for deletion
    const favourite_id = favourites?.find(favourite => favourite.post_id === id && favourite.user_id === user_id)?.id;

    const FAVOURITES_API_URL = "https://exchange-forum-rails-backend.onrender.com/favourites/" + favourite_id;
    axios.delete(FAVOURITES_API_URL);
    toast("Favourite removed")
  }

  const youractivityposts = posts?.filter(post => post.user_id === user_id);
  const favouritesposts = posts?.filter(post => favourites?.filter(favourite => favourite.user_id === user_id)
    .map(a => a.post_id).includes(post.id));
  const categories_SummerExchangeProgramme = posts?.filter(post => post.category === "Summer Exchange Programme");
  const categories_WinterExchangeProgramme = posts?.filter(post => post.category === "Winter Exchange Programme");
  const categories_OverseasExchangeProgramme = posts?.filter(post => post.category === "Overseas Exchange Programme");
  const categories_NUSOverseasCollege = posts?.filter(post => post.category === "NUS Overseas College");

  function changepostheight() {
    var item = document.querySelectorAll('.item');
    for (let i = 0; i < item.length; i++) {
      item[i].setAttribute("style", "height: 530px;");
    }
  }




  let finalpost = null;
  if (location.pathname === "/favourites") {
    finalpost = favouritesposts;
  } else if (location.pathname === "/yourposts") {
    finalpost = youractivityposts;
  } else if (location.pathname === "/categories") {
    finalpost = posts;
    // Setting the Post height to be smaller to accomodate the category view
    changepostheight();
  } else if (location.pathname === "/categories/SummerExchangeProgramme") {
    finalpost = categories_SummerExchangeProgramme;
    // Setting the Post height to be smaller to accomodate the category view
    changepostheight();
  } else if (location.pathname === "/categories/WinterExchangeProgramme") {
    finalpost = categories_WinterExchangeProgramme;
    // Setting the Post height to be smaller to accomodate the category view
    changepostheight();
  } else if (location.pathname === "/categories/OverseasExchangeProgramme") {
    finalpost = categories_OverseasExchangeProgramme;
    // Setting the Post height to be smaller to accomodate the category view
    changepostheight();
  } else if (location.pathname === "/categories/NUSOverseasCollege") {
    finalpost = categories_NUSOverseasCollege;
    // Setting the Post height to be smaller to accomodate the category view
    changepostheight();
  } else {
    finalpost = posts;
  }

  return (
    <div >

      <ul className="hs">

        {finalpost?.map(post =>
          <li className='item'>
            <h2 className='posttitle'>{post.id}.  {post.title}</h2>

            {/* Button to unfavourite/favourite */}
            {location.pathname === "/favourites"
              ? <button className='favouritebutton' onClick={(e) => deletefavourite(post.id)}>
                <img className='shrink' src={unfavourite} alt='Unfavourite'></img>
              </button>
              : <button className='favouritebutton' onClick={(e) => addfavourite(post.id)}>
                <img className='shrink' src={favourite} alt='Favourite'></img>
              </button>
            }

            <div className='sidebyside'>
              <h3 className='postdate'>{post.created_at.slice(0, 10)}</h3>
              <div className='recommend'>
                <button className='button' onClick={(e) => addrecommend("recommend", post.id, post.recommend)}>
                  <img src={recommendimage} alt='Recommend'></img>
                </button> {post.recommend}
                <button className='button' onClick={(e) => addrecommend("unrecommend", post.id, post.unrecommend)}>
                  <img src={unrecommendimage} alt='Unrecommend'></img>
                </button> {post.unrecommend}
              </div>
            </div>

            <p className='postbody'>{post.body}</p>
            <Comments comments={comments.filter(comment => comment.post_id === post.id)} />


            {/* Option to delete and Edit users' own posts */}
            {post.user_id === user_id
              ? <div>
                <Link className='deletebutton' to={'/'} onClick={() => deletepost(post.id)} >
                  Delete Post
                </Link>
                <Link className='editbutton' to={'/editpost'} onClick={() => recordPost(post.id)} >
                  Edit Post
                </Link>
              </div>
              : ""}

            <Link className='commentbutton' to={'/addcomment'} onClick={() => recordPost(post.id)} >Add Comment</Link>

          </li>)}
      </ul>
      <ToastContainer />
    </div>
  )
}

export default Posts
