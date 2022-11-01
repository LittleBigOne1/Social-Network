import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';
import Like from '../Like/Like';

import './Card.css';
// import PP from "./default_profil_picture_user.png";
export default function Card(props) {
   console.log('props =>', props.url);
   const [totalLikes, setTotalLikes] = useState(props.likes);
   const [postId, setPostId] = useState(props.id);
   const [usersLiked, setUsersLiked] = useState(props.usersLiked);
   const [userData, setDataUser] = useState([]);
   const allUsers = props.allUsers;
   const [allProps, setAllProps] = useState(props);
   // console.log(allProps.likes);
   useEffect(() => {
      const user = allUsers.find((element) => element._id === props.userId);
      setDataUser(user);
      // console.log(user.lastName);

      // a terminer/corriger !!! ------
   }, []);
   // const firstNamee = {userData.firstName}
   // const lastName = {userData.lastName}
   // console.log(userData);
   // Array.prototype.find() pour trouver le nom de l'auteur du post en fonction de son id"
   return (
      <div className="card">
         <div className="card-pp-name">
            <div className="pp">
               <img src={props.url} alt="pp" />
            </div>
            <div className="name-time">
               <h4>
                  {props.firstName} {props.lastName}
               </h4>
               <Moment className="timeStamp" format=" HH:mm - DD/MM/YY ">
                  {props.createdAt}
               </Moment>
            </div>
         </div>

         <div className="card-text">
            <p>
               {props.message}
            </p>
         </div>
         {props.url && (
            <div className="card-img">
               <img src={props.url} alt="image du post" />
            </div>
         )}

         {/* <div className={props.url ? "card-img" : "displayNone"}>
            <img src={props.url} alt="image du post" />
         </div> */}

         <div className="like-comment">
            <Like likes={totalLikes} id={postId} usersLiked={usersLiked} />
            <button>commentaires</button>
         </div>
      </div>
   );
}
