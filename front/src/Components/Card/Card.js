import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';
import Like from '../Like/Like';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import EditPost from '../EditPost/EditPost';

import styles from './Card.module.css';
import Close from '../../assets/images/Close-icon.svg';
import Edit from '../../assets/images/edit.svg';

axios.defaults.baseURL = 'http://localhost:8000/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.timeout = 6000;
axios.defaults.withCredentials = true;

// import PP from "./default_profil_picture_user.png";
export default function Card(props) {
  // states
  const [totalLikes, setTotalLikes] = useState(props.likes);
  const [postId, setPostId] = useState(props.id);
  const [usersLiked, setUsersLiked] = useState(props.usersLiked);
  const [userData, setDataUser] = useState([]);
  const [modal, setModal] = useState(false);

  // cookies
  const [cookies, setCookie] = useCookies([]);
  const userIdCookie = cookies.userId.split('').reverse().join('');

  const isAdmin = () => {
    axios
      .get('/auth/isadmin/' + userIdCookie)
      .then((data) => {
        return data.data;
      })
      .catch(() => {
        return false;
      });
  };

  const [displaySettings, setDisplaySettings] = useState(() => {
    if (userIdCookie === props.userId || isAdmin()) {
      return true;
    } else {
      return false;
    }
  });
  console.log(displaySettings);
  const allUsers = props.allUsers;
  useEffect(() => {
    const user = allUsers.find((element) => element._id === props.userId);
    setDataUser(user);
  }, []);

  const deletePost = (e) => {
    axios
      .delete(`/posts/${props.id}`)
      .then((data) => {
        console.log(data);
        e.target.closest('.card').remove();
      })

      .catch((err) => {
        console.log('catch axios deletePost', err);
      });
  };
  //   const editPost = () => {
  //    console.log('edit post');
  //    axios.put(`/posts/${props.id}`,{})

  //   };
  const toggleModal = () => {
    setModal(!modal);
  };
  // <div className="overlay">
  //    <div className="modal">
  //       <div className="modal_content">
  //          <h2>Que voulez-vous modifier ?</h2>
  //          <textarea name="" id="" cols="30" rows="10" defaultValue={props.message}></textarea>
  //          {/* <img src={props.url} alt="" /> */}
  //          <input
  //             // onChange={handleFile}
  //             accept=".jpg, .jpeg, .png"
  //             id="file"
  //             name="file"
  //             className="input__file "
  //             type="file"
  //          />
  //          <button>Annuler</button>
  //          <button>Valider</button>
  //       </div>
  //    </div>
  // </div>

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.cardHeaderPpName}>
          <div className={styles.pp}>
            <img src={props.url} alt="pp" />
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
      {modal && <EditPost message={props.message} id={props.id} />}
      <div className={`${modal ? styles.displayNone : styles.cardText}`}>
        <p className={styles.message}>{props.message}</p>
      </div>
      {props.url && (
        <div className={`${modal ? styles.displayNone : styles.cardImg}`}>
          {/* <div className={modal ? 'displayNone' : 'card-img'}> */}
          <img className={styles.img} src={props.url} alt="image du post" />
        </div>
      )}

      {/* <div className="likeComment"> */}
      <div className={`${modal ? styles.displayNone : styles.likeComment}`}>
        <div className={styles.likes}>
          <Like likes={totalLikes} id={postId} usersLiked={usersLiked} />
        </div>
        {/* <div className="comments">
          <p>Commentaires</p>
        </div> */}
      </div>
    </div>
  );
}
