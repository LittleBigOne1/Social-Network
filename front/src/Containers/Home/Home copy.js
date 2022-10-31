import React, { useEffect, useState } from 'react';
import './Home.css';
import Card from '../../Components/Card/Card';
import CreatePost from '../../Components/CreatePost/CreatePost';
import useFetch from '../../useFetch';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate,Link } from 'react-router-dom';

export default function Home() {
   const [postsData, setPostsData] = useState([]);
   const [allUsers, setAllUsers] = useState([]);
   const [error, setError] = useState([]);
   const [cookies, setCookie] = useCookies([]);
   //const userIdCookie = cookies.userId.split('').reverse().join('');
   const navigate = useNavigate();
   console.log('token ==>', cookies.token);
   useEffect(() => {
      axios
         .get('http://localhost:3000/api/auth/info')
         .then((data) => {
            console.log('data axios', data.data);
            const allUsers = data.data;
            // console.log(allUsers);
            setAllUsers(data.data);
            // -------- mettre dans une fonction -------
            axios
               .get('http://localhost:3000/api/posts', {
                  headers: { Authorization: 'bearer ' + cookies.token },
               })
               .then((data) => {
                  // console.log('data axios', data.data);

                  setPostsData(data.data);
                  console.log('avant displayHome');
                  displayHome()
               })
               .catch((err) => {
                  console.log('catch ==> ', err);
                  setError(err);
               });
            //-------------------------------
         })
         .catch((err) => {
            console.log(err);
         });
      
   }, []);
   console.log('error ==>', error);
   console.log('postsData ==>', postsData);

   
   const displayHome=() => {
      console.log('debut displayHome');
if (postsData.error || error) {
       console.log('if error');
      navigate('/login', { replace: true });
   } else {
      console.log('else');

      return (
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
   }

   
   }
    
   

   

}
