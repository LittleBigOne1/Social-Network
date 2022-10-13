import React from 'react'
import './Post.css'
export default function post(props) {
  return (
    <div className='post'>
        {props.children}
    </div>
  )
}
