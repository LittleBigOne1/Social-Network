import { createContext, useState } from 'react';

// création du context pour l'authentification
// pour stocker les données: token, userId etc

// const defaultValue = {
//    {token: 'je suis le token'}
   
// };

const AuthContext = createContext();

// context provider
export const AuthContextProvider = (props) => {
   
   return (
      <AuthContext.Provider value={"==> token <=="}>
         {props.children}
      </AuthContext.Provider>
   );
};

export default AuthContext;
