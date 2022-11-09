import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';
import Like from '../Like/Like';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import EditPost from '../EditPost/EditPost';

import styles from './Card.module.css';
import Close from '../../assets/images/Close-icon.svg';
import Edit from '../../assets/images/edit.svg';

export default function Card(props) {
  // states
  const [totalLikes, setTotalLikes] = useState(props.likes);
  const [postId, setPostId] = useState(props.id);
  const [usersLiked, setUsersLiked] = useState(props.usersLiked);
  const [modal, setModal] = useState(false);

  // cookies
  const [cookies, setCookie] = useCookies([]);
  const userIdCookie = cookies.userId.split('').reverse().join('');

  const [displaySettings, setDisplaySettings] = useState(() => {
    if (userIdCookie === props.userId || props.isAdmin) {
      return true;
    } else {
      return false;
    }
  });

  const deletePost = (e) => {
    axios
      .delete(`/posts/${props.id}`)
      .then((data) => {
        e.target.closest('#card').remove();
      })

      .catch((err) => {
        console.log('catch axios deletePost', err);
      });
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <div className={styles.card} id="card">
      <div className={styles.cardHeader}>
        <div className={styles.cardHeaderPpName}>
          <div className={styles.pp}>
            <span className={styles.letters}>
              {props.firstName.split('')[0]}
              {props.lastName.split('')[0]}
            </span>
          </div>
          <div className={styles.nameTime}>
            <h4>
              {props.firstName} {props.lastName}
            </h4>
            <Moment className={styles.timeStamp} format=" HH:mm - DD/MM/YY ">
              {props.createdAt}
            </Moment>
          </div>
        </div>
        {displaySettings && (
          <div className={styles.cardHeaderSettings}>
            <img
              onClick={toggleModal}
              src={Edit}
              alt="bouton de suppression d'article"
              className={styles.editButton}
            />
            <img
              onClick={deletePost}
              src={Close}
              alt="bouton de suppression d'article"
              className={styles.closeButton}
            />
          </div>
        )}
      </div>
      {modal && (
        <EditPost
          message={props.message}
          id={props.id}
          toggleModal={toggleModal}
          axiosPostData={props.axiosPostData}
        />
      )}
      <div className={`${modal ? styles.displayNone : styles.cardText}`}>
        <p className={styles.message}>{props.message}</p>
      </div>
      {props.url && (
        <div className={`${modal ? styles.displayNone : styles.cardImg}`}>
          <img className={styles.img} src={props.url} alt="image du post" />
        </div>
      )}

      <div className={`${modal ? styles.displayNone : styles.likeComment}`}>
        <div className={styles.likes}>
          <Like likes={totalLikes} id={postId} usersLiked={usersLiked} />
        </div>
      </div>
    </div>
  );
}
