// src/services/authService.js

const API_URL = "https://kaptain.orksandroll.fr/api/index.php/"; // Remplacez par l'URL de votre API Dolibarr

export const login = async (username, password) => {
    const response = await fetch(`${API_URL}login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Ajoutez d'autres en-têtes si nécessaire
        },
        body: JSON.stringify({
            login: username,
            password: password,
            reset: "1"
        }),
    });

    if (!response.ok) {
        throw new Error('Erreur de connexion');
    }

    const data = await response.json();
    return data;
};
