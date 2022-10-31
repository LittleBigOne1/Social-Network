import React, { useEffect, useState } from 'react';
import './Home.css';
import Card from '../../Components/Card/Card';
import CreatePost from '../../Components/CreatePost/CreatePost';
// import useFetch from '../../useFetch';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export default function Home() {
   const [postsData, setPostsData] = useState([]);
   const [allUsers, setAllUsers] = useState([]);
   const [error, setError] = useState([]);
   const [cookies, setCookie] = useCookies([]);
   //const userIdCookie = cookies.userId.split('').reverse().join('');
   const navigate = useNavigate;
   // console.log('token  ==>', cookies.token);
   // console.log('postData  ==>', postsData);

   useEffect(() => {
      axios
         .get('http://localhost:3000/api/auth/info')
         .then((data) => {
            // console.log('data axios', data.data);
            const allUsers = data.data;
            // console.log(allUsers);
            setAllUsers(allUsers);
            // -------- mettre dans une fonction -------
            axios
               .get('http://localhost:3000/api/posts', {
                  headers: { Authorization: 'bearer ' + cookies.token },
               })
               .then((data) => {
                  // console.log('data axios', data.data);

                  setPostsData(data.data);
               })
               .catch((err) => {
                  console.log('catch axios allPosts==> ', err);
                  setError(err);
                  navigate('/login');
               });
            //-------------------------------
         })
         .catch((err) => {
            console.log('catch axios allUsers ==> ', err);
         });
      // fetch('http://localhost:3000/api/posts', {
      //    headers: { Authorization: 'bearer ' + 'token a remplir !!' },
      // })
   }, []);
   // ----- récupérer les users avec un axios
   // Array.prototype.find() pour trouver le nom de l'auteur du post en fonction de son id"

   // useEffect(() => {
   //   ;
   // }, []);
   // console.log(allUsers);
   // const { data, loading, error } = useFetch('http://localhost:3000/api/posts');
   // console.log(data, loading, error);
   // console.log(error);
   useEffect(() => {}, []);

   if (postsData.error) {
      console.log('if error');
      navigate('/login');
   } else {
      return (
         // ---- ajouter une fonction d'affichage selon si connecté ou pas ----
         <>
            <CreatePost />
            <h1 className="home-title">Tous les articles</h1>
            <div className="container-posts">
               {postsData
                  .map((item) => {
                     const user = allUsers.find(
                        (element) => element._id === item.userId
                     );
                     return (
                        <Card
                           xmessage={item.message}
                           key={item._id}
                           id={item._id}
                           createdAt={item.createdAt}
                           url={item.imageUrl}
                           likes={item.likes}
                           usersLiked={item.usersLiked}
                           allUsers={allUsers}
                           userId={item.userId}
                           firstName={user.firstName}
                           lastName={user.lastName}
                           pp={user.profilePicture}
                        />
                     );
                  })
                  .reverse()}
            </div>
         </>
      );
   }
}