import React from 'react'
import '../componentcss/comments.css'

interface Comment {
    post_id: string;
    body: string;
    user_id: string;
    recommend: number;
    unrecommend: number;
    comment_id: string;
    created_at: string;
    updated_at: string;
}

interface CommentProps {
    comments: Comment[];
}


function Comments(props: CommentProps) {

  var vs = document.querySelector('.vs');
  const n = props.comments.length;
  vs?.setAttribute("style","grid-template-rows:repeat(" + n + ", calc(50% - 40px));");


  return (
    <div>
      <ul className="vs">
          
          {props.comments.map(comment => 
            <li className='vitem'>
                <p className='commentbody'>{ comment.body }</p>
                <p className='vrecommend'>{ comment.recommend }</p>
                <p className='vunrecommend'>{ comment.unrecommend }</p>
            </li>)}
      </ul>
    </div>
  )
}

export default Comments