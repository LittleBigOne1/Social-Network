import React, { useState } from 'react';
import './CreatePost.module.css';
import { useCookies } from 'react-cookie';
import axios from 'axios';

// axios.defaults.baseURL='http://localhost:8000/api'
axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.timeout=6000
axios.defaults.withCredentials = true;

export default function CreatePost(props) {
   const [cookies, setCookie] = useCookies([]);
   const [file, setFile] = useState(null);
   console.log('init =>', file);

   const userIdCookie =
      cookies.userId && cookies.userId.split('').reverse().join('');

   const handleFormPost = async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append('userId', userIdCookie);
      formData.append('message', e.target['message'].value);
      if (file !== null) {
         formData.append('file', file);
      }
      console.log(formData);
      try {
         await axios.post('/posts/', formData, {
            headers: {
               'Content-Type': 'multipart/form-data',
            },
         });
         e.target['message'].value = '';
         setFile(null);
      } catch (err) {
         console.log(err);
      }
   };

   const handleFile = (e) => {
      setFile(e.target.files[0]);
   };
   console.log('find script =>', file);

   return (
      cookies.userId && (
         <>
            <h1>Create post</h1>
            <form onSubmit={handleFormPost}>
               <label htmlFor="message" className="form__title">
                  Exprimez-vous !
               </label>
               <textarea name="message" required />
               <label htmlFor="file"></label>
               <input
                  onChange={handleFile}
                  accept=".jpg, .jpeg, .png"
                  id="file"
                  name="file"
                  className="input__file "
                  type="file"
               />
               <button>Publier</button>
            </form>
         </>
      )
   );
}
