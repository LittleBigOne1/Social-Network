import React, { useState, useEffect } from 'react';
import styles from './Like.module.css';
import axios from 'axios';
import likeButton from '../../assets/likeButton.svg';
import AxiosPost from '../../useAxiosPost';
import useAxiosPost from '../../useAxiosPost';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';

// import {ReactComponent as likeButton} from '../../assets/likeButton.svg'

export default function Like(props) {
   console.log(props);
   console.log(`localhost:3000/api/posts/${props.id}/like`);
   const usersLiked = props.usersLiked;
   const [cookies, setCookie] = useCookies([]);
   const userIdCookie = cookies.userId.split('').reverse().join('');
   const [toggle, setToggle] = useState(Boolean);
   const isLiked = () => {
      if (usersLiked.includes(userIdCookie)) {
         console.log('ok');
         setToggle(true);
         console.log('----deja liké (true)', toggle);
      }
      if (usersLiked.includes(userIdCookie) === false) {
         console.log('not ok');
         setToggle(false);
         console.log('----pas encore liké (false)', toggle);
      }
      console.log('TOGGLE AFTER ISLIKED', toggle);
      // console.log('déja liké ? ',usersLiked.includes(userIdCookie));
      // }
      // const isLiked = ()=>{
      //    console.log(usersLiked.includes(userIdCookie));
      // }
      // ------------- OU ------------------
      // ou plutot return false ou true et appeler la f
      // usersLiked.includes(
      //    // userId de la personne connecté
      //    )? setToggle(false): setToggle(true)
   };
   useEffect(() => {
      console.log('toggle AVANT foonction -----', toggle);
      isLiked();
      // console.log('toggle APRES foonction -----',toggle);
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
            .post(`localhost:3000/api/posts/${props.id}/like`,{like:1}, {
               headers: { Authorization: 'bearer ' + cookies.token,
                 }
               ,
            })
            .then((data) => {
               console.log(data);
            })

            .catch((err) => {
               console.log('catch axios post undo like', err);
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
            .post(`localhost:3000/api/posts/${props.id}/like`,{like:0}, {
               headers: { Authorization: 'bearer ' + cookies.token,
                 }
               ,
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
      <>
         <img src={likeButton} alt="likeButton" onClick={addLike} />
         <span>{likeCounter}</span>
      </>
   );
}
