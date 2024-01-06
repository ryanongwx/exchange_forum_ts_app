import React from 'react'
import { Link } from 'react-router-dom'
import Posts from './Posts'
import '../componentcss/categories.css'

function Categories() {
  return (
    <div>
      <Link className='categorybutton' to={'/categories/SummerExchangeProgramme'} >
        Summer Exchange Programme
      </Link>
      <Link className='categorybutton' to={'/categories/WinterExchangeProgramme'} >
        Winter Exchange Programme
      </Link>
      <Link className='categorybutton' to={'/categories/OverseasExchangeProgramme'} >
        Overseas Exchange Programme
      </Link>
      <Link className='categorybutton' to={'/categories/NUSOverseasCollege'} >
        NUS Overseas College
      </Link>
      <Posts />
    </div>
  )
}

export default Categories