import React, { useState } from 'react';

function ResetPasswordForm() {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('username', username);

    try {
      const response = await fetch('https://kaptain.orksandroll.fr/user/passwordforgotten.php', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setMessage('Un email de réinitialisation a été envoyé, si le compte existe.');
      } else {
        setMessage('Erreur lors de la soumission du formulaire. Veuillez réessayer plus tard.');
      }
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire:', error);
      setMessage('Erreur lors de la connexion au serveur. Veuillez réessayer plus tard.');
    }

    setIsLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Identifiant</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Traitement...' : 'Réinitialiser le mot de passe'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ResetPasswordForm;
