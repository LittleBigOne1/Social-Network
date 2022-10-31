import { useEffect, useState } from 'react';
import axios from 'axios';

function useFetch(url) {
   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(false);
   const [error, SetError] = useState(null);
   useEffect(() => {
      setLoading(true);
      axios.post(url)
         .then((response) => {
            setData(response.data);
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

export default useFetch;
