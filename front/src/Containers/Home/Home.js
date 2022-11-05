import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import Card from '../../Components/Card/Card';
import CreatePost from '../../Components/CreatePost/CreatePost';
// import useFetch from '../../useFetch';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';


// axios configuration
axios.defaults.baseURL = 'http://localhost:8000/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.timeout = 6000;
axios.defaults.withCredentials = true;

export default function Home() {
   const [postsData, setPostsData] = useState([]);
   const [allUsers, setAllUsers] = useState([]);
   const [error, setError] = useState([]);
   const [cookies, setCookie] = useCookies([]);
   //const userIdCookie = cookies.userId.split('').reverse().join('');
   const navigate = useNavigate();
   // console.log('token  ==>', cookies.token);
   // console.log('postData  ==>', postsData);

   useEffect(() => {
      axios
         .get('/auth/info')
         .then((data) => {
            // console.log('data axios', data.data);
            const allUsers = data.data;
            setAllUsers(allUsers);
            // -------- mettre dans une fonction -------
            axios
               .get('/posts')
               .then((data) => {
                  // console.log('data axios', data.data);

                  setPostsData(data.data);
               })
               .catch((err) => {
                  navigate('/login', { replace: true });
                  console.log('catch axios allPosts==> ', err);
                  setError(err);
               });
            //-------------------------------
         })
         .catch((err) => {
            console.log('allUsers', allUsers);

            navigate('/login', { replace: true });

            // console.log('catch axios allUsers ==> ', err);
         });
   }, []);

   // useEffect(() => {}, []);

   // if (postsData.error || allUsers == null) {
   //    console.log('if error');
   //    navigate('/login');
   // } else {
      return (
         <>
            <Navbar />
            <CreatePost />
            <h1 className={styles.homeTitle}>Tous les articles</h1>
            <div className={styles.containerPosts}>
               {postsData
                  .map((item) => {
                     const user = allUsers.find(
                        (element) => element._id === item.userId
                     );
                     return (
                        <Card
                           message={item.message}
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
   // }
}
