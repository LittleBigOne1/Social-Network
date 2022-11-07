import React, { useState } from 'react';
import styles from './EditPost.module.css';
import { useCookies } from 'react-cookie';

import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8000/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.timeout = 6000;
axios.defaults.withCredentials = true;

export default function EditPost(props) {
  console.log('props ------', props);
  const [cookies, setCookie] = useCookies([]);
  const userIdCookie =
    cookies.userId && cookies.userId.split('').reverse().join('');
  const [file, setFile] = useState(null);

  const handleFormPost = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    console.log(formData);
    formData.append('message', e.target['message'].value);
    if (file !== null) {
      formData.append('file', file);
    }
    try {
      await axios.put(`/posts/${props.id}`, formData);
      props.axiosPostData()
      props.toggleModal()
    } catch (err) {
      console.log(err);
    }
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };
  return (
    <>
      <form onSubmit={handleFormPost} className={styles.form}>
        <h2 className={styles.title}>Que voulez-vous modifier ?</h2>
        <textarea
          className={styles.textarea}
          name="message"
          id=""
          //  cols="30" rows="10"
          defaultValue={props.message}
          maxLength="1500"
        ></textarea>
        <input
          onChange={handleFile}
          accept=".jpg, .jpeg, .png"
          id="file"
          name="file"
          className={styles.inputFile}
          type="file"
        />
        <div className={styles.buttons}>
          <button onClick={props.toggleModal} className={styles.cancelButton}>
            Annuler
          </button>
          <button className={styles.submitButton}>Valider</button>
        </div>
      </form>
    </>
  );
}
