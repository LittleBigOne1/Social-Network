import React ,{useState} from 'react';
import styles from './EditPost.module.css';
import { useCookies } from 'react-cookie';

import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8000/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.timeout = 6000;
axios.defaults.withCredentials = true;

export default function EditPost(props) {
//   console.log(props);
  const [cookies, setCookie] = useCookies([]);
  const userIdCookie = cookies.userId && cookies.userId.split('').reverse().join('');
  const [file, setFile] = useState(null);

  const handleFormPost = async (e) => {
    e.preventDefault();
   console.log(e.target)
    const formData = new FormData();
    formData.append('userId', userIdCookie);
    formData.append('message', e.target['message'].value);
    if (file !== null) {
      formData.append('file', file);
    }
    try {
      console.log(formData);
      await axios.put(
        `/posts/${props.id}`,
        formData
        //  {
        //    headers: {
        //       'Content-Type': 'multipart/form-data',
        //    },
        // }
      );
      // .then(navigate('/'))
      // window.location.reload();
      // navigate('/')

      // e.target['message'].value = '';
      // setFile(null);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <form onSubmit={handleFormPost}>
        <h2>Que voulez-vous modifier ?</h2>
        <textarea
          className={styles.textarea}
          name="message"
          id=""
          //  cols="30" rows="10"
          defaultValue={props.message}
        ></textarea>
        {/* <img src={props.url} alt="" /> */}
        <input
          // onChange={handleFile}
          accept=".jpg, .jpeg, .png"
          id="file"
          name="file"
          className="input__file "
          type="file"
        />
        <button>Annuler</button>
        <button>Valider</button>
      </form>
    </div>
  );
}
