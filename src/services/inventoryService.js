import axios from 'axios';
import { BASEURL } from '../constants/api';

export const LoginService = data => {
    const url = `${BASEURL}auth/login`;
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
        .then(responseData => {
            return responseData;
        })
        .catch(error => {
            throw new Error(error.message);
        });
};
