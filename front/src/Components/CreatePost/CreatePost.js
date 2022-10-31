import React, { useState } from 'react';
import styles from './CreatePost.module.css';
import { useCookies } from 'react-cookie';
import axios from 'axios';

// axios.defaults.baseURL='http://localhost:3000/api'
axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.timeout=6000
axios.defaults.withCredentials = true;

export default function CreatePost(props) {
   const [cookies, setCookie] = useCookies([]);
   const [file, setFile] = useState(null);

   const userIdCookie = cookies.userId.split('').reverse().join('');
   // console.log(userIdCookie);
   // console.log(props);
   // const params = useParams();
   // console.log(params);
   const handleFile = (e) => {
      setFile(e.target.files[0]);
      console.log(e.target.files[0]);
   };
   const handleFormPost = (e) => {
      e.preventDefault();
      // console.log(e.target['message'].value);
      // console.log(e.target[1].files[0]);
      // console.log(e.target['file']);
      // console.log(e.target.files[0]);

      const formData = new FormData();
      formData.append('userId', userIdCookie);
      formData.append('message', e.target['message'].value);
      if (file) {
         formData.append('file', file);
      }

      const postData = {
         userId: userIdCookie,
         message: e.target['message'].value,
         file: file,
      };
      console.log(postData);
      try {
         axios
            .post(
               '/posts/',
               formData
               // {
               // headers: {
               //    Authorization: 'bearer ' + cookies.token,
               //    "Content-Type": 'application/json',
               // },
               // }
            )
            // .then((data) => {
            //    console.log(data);
            //    // setFile(null);
            // })

            .catch((err) => {
               console.log('catch axios post createPost', err);
            });
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <>
         <h1> </h1>
         <form onSubmit={handleFormPost}>
            <label htmlFor="message" className="form__title">
               Exprimez-vous !
            </label>
            <textarea type="text" name="message" required />
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
   );
}
