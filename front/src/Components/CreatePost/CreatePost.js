import React, { useState } from 'react';
import styles from './CreatePost.module.css';
import { useCookies } from 'react-cookie';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
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
      await axios.post('/posts/', formData);
      props.axiosPostData();
      e.target['message'].value = '';

      document.querySelector('#file').value = '';
      setFile(null);
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
          <label htmlFor="message" className={styles.formTitle}>
            Exprimez-vous !
          </label>
          <textarea
            className={styles.textarea}
            name="message"
            maxLength="1500"
            placeholder="Entrez votre message ici..."
            title="Message"
            required
            aria-label="message"
          />

          <input
            onChange={handleFile}
            accept=".jpg, .jpeg, .png"
            id="file"
            name="file"
            className={styles.inputFile}
            type="file"
            aria-label="file"
            tabIndex="0"
          />
          <button className={styles.button} role="button" tabIndex="0">
            Publier
          </button>
        </form>
      </>
    )
  );
}
