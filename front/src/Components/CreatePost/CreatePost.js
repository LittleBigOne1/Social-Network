import React from 'react'
import { useParams } from 'react-router-dom'
import './CreatePost.css'

export default function CreatePost() {
  const params = useParams()
  console.log(params);
  return (
    < >
        <h1>Quoi de neuf ?</h1>
        <form className='form-create-post'>
          <textarea className='form-create-post-textarea' name='message'/>
        </form>
          <button wrap='hard' type='button'>Publier</button>
    </>
  )
}
