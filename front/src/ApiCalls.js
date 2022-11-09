import React, { useState } from 'react';

import axios from 'axios';

// axios configuration
axios.defaults.baseURL = 'http://localhost:8000/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.timeout = 6000;
axios.defaults.withCredentials = true;

// export const GetAllPosts = async () => {
//   const res = await axios.get('/posts')
//   const data = res.data.reverse()
//   console.log(data)
//   return {data},data
// //   .then(()=>{
    
// //   })
// };

export const useGetRequest = (url) =>{
    const [data, setData] = useState(null);
   const [loading, setLoading] = useState(false);
   const [error, SetError] = useState(null);
    axios.get('/posts')


}