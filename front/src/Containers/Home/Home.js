import React, { useEffect, useState } from 'react';
import './Home.css';
import Post from '../../Components/Card/Card';
import CreatePost from '../../Components/CreatePost/CreatePost';

export default function Home() {
   const [dataArr, setDataArr] = useState([]);
   useEffect(() => {

    fetch('http://localhost:3000/api/posts')
    .then(response => {
      // console.log(response);
      return (response.json())
    })
    .then(data => {
      console.log(data[0]);
      setDataArr(data)
      // console.log(dataArr);
  
    })

  }, [])

   return (
      <>
         <CreatePost />
         <h1 className="home-title">Tous les articles</h1>
         <div className="container-posts">
            
            {dataArr.map((item) => {
               return (<Post
               message={item.message}
               key={item._id}
               id={item._id}
               createdAt={item.createdAt}
               url = {item.imageUrl}

               />)
            })}
         </div>
      </>
   );
}
