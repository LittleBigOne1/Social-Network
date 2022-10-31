import axios from 'axios';
import { useEffect, useState } from 'react';
axios.defaults.baseURL = 'http://localhost:3000/api/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

// headers: { Authorization: 'bearer ' + 'token a remplir !!' }
function useAxiosPost(url,
   //  token,
     object) {
   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(false);
   const [error, SetError] = useState(null);
   useEffect(() => {
      setLoading(true);
      axios
         .post(
            url,
            {
               // headers: {
               //    //'Authorization': 'Bearer ' + validToken()
               //    Authorization: 'bearer ' + token,
               // },
            },
            object
         )
         .then((res) => {
            setData(res.data);
         })
         .catch((err) => {
            SetError(err);
         })
         .finally(() => {
            setLoading(false);
         });
   }, []);
   return { data, loading, error };
}
export default useAxiosPost;
