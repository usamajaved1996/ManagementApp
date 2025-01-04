import axios from 'axios';
import { BASEURL } from '../constants/api';

// export const LoginService = data => {
//     const url = `${BASEURL}auth/login`;
//     return fetch(url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//     })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(response.status);
//             }
//             return response.json();
//         })
//         .then(responseData => {
//             return responseData;
//         })
//         .catch(error => {
//             throw new Error(error.message);
//         });
// };
export const LoginService = data => {
    const url = `${BASEURL}auth/login`;
    console.log('url', data)
    return axios
        .post(url, data)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw new Error(error);
        });
};
export const SignUpService = data => {
    const url = `${BASEURL}auth/signup`;
    return axios
        .post(url, data)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw new Error(error);
        });
};
export const ForgotService = data => {
    const url = `${BASEURL}v1/users/forgotpassword`;
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