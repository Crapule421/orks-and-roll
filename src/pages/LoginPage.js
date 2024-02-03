// src/pages/LoginPage.js

import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loggedIn = await login(username, password);
    if (loggedIn) {
      navigate('/member-area'); // Rediriger vers l'espace membre
    } else {
      alert('Échec de la connexion');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form onSubmit={handleSubmit} className="p-10 bg-white rounded shadow-xl">
        <div className="mb-6">
          <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Nom d'utilisateur</label>
          <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Mot de passe</label>
          <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2">
            Connexion
          </button>
          <a href="/reset-password" className="inline-block align-baseline font-bold text-sm text-orange-500 hover:text-orange-800">
            Mot de passe oublié ?
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
