import axios from 'axios';
import React from 'react'
import '../componentcss/comments.css'
import recommendimage from "../images/recommend.png"
import unrecommendimage from "../images/unrecommend.png"
import deleteimage from "../images/delete.png"

interface Comment {
  post_id: number;
  body: string;
  user_id: number;
  recommend: number;
  unrecommend: number;
  id: number;
  created_at: string;
  updated_at: string;
}

interface CommentProps {
  comments: Comment[];
}


function Comments(props: CommentProps) {

  function addrecommend(instruction: string, id: number, count: number) {
    const COMMENTS_API_URL = "https://exchange-forum-rails-backend.onrender.com/comments/" + id;
    const updated_count = count + 1;
    // Update the number of recommend/unrecommend in database in rails

    if (instruction === "recommend") {
      axios.put<Comment>(COMMENTS_API_URL,
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
      //record unrecommend to rails db
      axios.put<Comment>(COMMENTS_API_URL,
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

    window.location.reload();

  }

  function deletecomment(id: number) {
    // Deletes comment from rails db
    const COMMENTS_API_URL = "https://exchange-forum-rails-backend.onrender.com/comments/" + id;
    axios.delete(COMMENTS_API_URL);

    window.location.reload();
  }



  return (
    <div>
      <ul className="vs">

        {props.comments.map(comment =>
          <li className='vitem'>
            <p className='commentbody'>{comment.body}</p>

            <p className='crecommend'>
              <button className='button' onClick={(e) =>
                addrecommend("recommend", comment.id, comment.recommend)}>
                <img src={recommendimage} alt='Recommend'></img>
              </button> {comment.recommend}
            </p>

            <p className='cunrecommend'>
              <button className='button' onClick={(e) =>
                addrecommend("unrecommend", comment.id, comment.unrecommend)}>
                <img src={unrecommendimage} alt='Unrecommend'></img>
              </button>{comment.unrecommend}
            </p>

            <button className='deletebutton1' onClick={() => deletecomment(comment.id)} >
              <img src={deleteimage} alt='delete' />
            </button>


          </li>)}
      </ul>
    </div>
  )
}

export default Comments
