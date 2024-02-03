// src/contexts/AuthContext.js

import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = async (username, password) => {
    try {
      const response = await fetch(`https://kaptain.orksandroll.fr/api/index.php/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login: username, password: password, reset: 1 }),
      });

      if (response.ok) {
        const user = await response.json();
        setCurrentUser(user); // Mettre à jour l'état d'authentification
        return true;
      }

      throw new Error('Échec de la connexion');
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const value = {
    currentUser,
    login,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
