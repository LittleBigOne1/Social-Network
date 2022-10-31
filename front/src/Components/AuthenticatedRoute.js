import React, { useContext } from 'react';
import { Route, useNavigate } from 'react-router-dom';
import Auth from '../Contexts/AuthContext';

const AuthenticatedRoute = ({ path, component }) => {
   const navigate = useNavigate();
   const { isAuthenticated } = useContext(Auth);
   return isAuthenticated ? (
      <Route exact path="path" element="element" />
   ) : (
      navigate('/login', { replace: true })
   );
};
export default AuthenticatedRoute;
