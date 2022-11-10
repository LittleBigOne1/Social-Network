import React, { useState, useEffect } from 'react';
import styles from './Like.module.css';
import axios from 'axios';
import likeButton from '../../assets/images/likeButton.svg';
import likeButtonRed from '../../assets/images/likeButtonRed.svg';

import { useCookies } from 'react-cookie';

axios.defaults.baseURL = 'http://localhost:8000/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.timeout = 6000;
axios.defaults.withCredentials = true;

export default function Like(props) {
  const usersLiked = props.usersLiked;
  const [cookies, setCookie] = useCookies([]);
  const userIdCookie = cookies.userId.split('').reverse().join('');
  const [toggle, setToggle] = useState(Boolean);
  const isLiked = () => {
    if (usersLiked.includes(userIdCookie)) {
      setToggle(true);
    }
    if (usersLiked.includes(userIdCookie) === false) {
      setToggle(false);
    }
  };
  useEffect(() => {
    isLiked();
  }, []);

  const [likeCounter, setLikeCounter] = useState(props.likes);
  const addLike = () => {
    if (!toggle) {
      setLikeCounter(likeCounter + 1);
      setToggle(!toggle);
      axios.post(`/posts/${props.id}/like`, {
        userId: userIdCookie,
        like: 1,
      });
    }
    if (toggle) {
      setLikeCounter(likeCounter - 1);
      setToggle(!toggle);
      // post 0 pour annuler le like
      axios.post(`/posts/${props.id}/like`, {
        userId: userIdCookie,
        like: 0,
      });
    }
  };

  return (
    <div className={styles.likeArea}>
      {toggle ? (
        <img
          src={likeButtonRed}
          alt="likeButton"
          className={styles.likeButton}
          onClick={addLike}
          title="Retirer le like"
          role="button"
          tabIndex="0"
        />
      ) : (
        <img
          src={likeButton}
          alt="likeButton"
          className={styles.likeButton}
          onClick={addLike}
          title="Liker l'article"
          role="button"
          tabIndex="0"
        />
      )}

      <span>{likeCounter}</span>
    </div>
  );
}
