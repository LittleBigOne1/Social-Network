import React, { useState, useEffect } from 'react';
import styles from './Like.module.css';
import axios from 'axios';
import likeButton from '../../assets/images/likeButton.svg';
import AxiosPost from '../../useAxiosPost';
import useAxiosPost from '../../useAxiosPost';
// import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';

axios.defaults.baseURL = 'http://localhost:3000/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.timeout = 6000;
axios.defaults.withCredentials = true;
// import {ReactComponent as likeButton} from '../../assets/likeButton.svg'

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

  // console.log(props);
  // console.log(`http://localhost:3000/api/${props.id}/like`);
  // const { data, loading, error } = useAxiosPost(`http://localhost:3000/api/${props.id}`);
  const [likeCounter, setLikeCounter] = useState(props.likes);
  const addLike = () => {
    if (
      !toggle
      //   && !usersLiked.includes(userIdCookie)
    ) {
      console.log('if toggle false');
      setLikeCounter(likeCounter + 1);
      setToggle(!toggle);
      // post +1 pour like
      axios
        .post(`/posts/${props.id}/like`, {
          userId: userIdCookie,
          like: 1,
        })
        .then((data) => {
          console.log(data);
        })

        .catch((err) => {
          console.log('catch axios post like', err);
        });
    }
    if (
      toggle
      //  && usersLiked.includes(userIdCookie)
    ) {
      console.log('if toggle true');
      setLikeCounter(likeCounter - 1);
      setToggle(!toggle);
      // post 0 pour annuler le like
      axios
        .post(`/posts/${props.id}/like`, {
          userId: userIdCookie,
          like: 0,
        })
        .then((data) => {
          console.log(data);
        })

        .catch((err) => {
          console.log('catch axios post undo like', err);
        });
    }

    // !toggle ?  setLikeCounter(likeCounter + 1), setToggle(!toggle) : setLikeCounter(likeCounter - 1),
    // setToggle(!toggle);
    // console.log('fin addLike, toogle:',toggle);
  };

  return (
    <div className={styles.likeArea}>
      <img
        src={likeButton}
        alt="likeButton"
        className={styles.likeButton}
        onClick={addLike}
      />
      <span>{likeCounter}</span>
    </div>
  );
}
