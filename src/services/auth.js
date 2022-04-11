import axios from 'axios';
import { config } from '../../config';


const API_KEY = config.apiKey;

async function authenticate(mode, email, password) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

    const response = await axios.post(url, {
        email: email,
        password: password,
        returnSecureToken: true,    
      });
    console.log(response.data); // Log the response from Firebase Auth

    const token = response.data.idToken; // return idToken from Firebase Auth
    return token;
}

export function createUser(email, password) {
    return authenticate('signUp', email, password);
}

export function login(email, password) {
    return authenticate('signInWithPassword', email, password);
}