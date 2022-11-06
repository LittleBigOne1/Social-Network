import React, { useState } from 'react';
import  styles from './CreatePost.module.css';
import { useCookies } from 'react-cookie';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';


// axios.defaults.baseURL='http://localhost:8000/api'
axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.timeout=6000
axios.defaults.withCredentials = true;

export default function CreatePost(props) {
  const [cookies, setCookie] = useCookies([]);
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

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
    try {
      await axios.post(
        '/posts/',
        formData
        //  {
        //    headers: {
        //       'Content-Type': 'multipart/form-data',
        //    },
        // }
      )
         // .then(navigate('/'))
       window.location.reload();
      // navigate('/')

      // e.target['message'].value = '';
      // setFile(null);
    } catch (err) {
      console.log(err);
    }
  };
  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };
  return (
    cookies.userId && (
      <>
        <h2 className={styles.title}>Créer un article</h2>
        <form className={styles.form} onSubmit={handleFormPost}>
          <label htmlFor="message" className="form__title">
            Exprimez-vous !
          </label>
          <textarea className={styles.textarea} name="message" required />
          
          <label className={styles.labelFile} htmlFor="file"> Choisissez votre image</label>
          <input
            onChange={handleFile}
            accept=".jpg, .jpeg, .png"
            id="file"
            name="file"
            className={styles.inputFile}
            type="file"
          />
          <button className={styles.button}>Publier</button>
        </form>
      </>
    )
  );
}
