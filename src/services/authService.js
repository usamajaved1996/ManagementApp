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
    console.log('Login data:', data);

    // Simulate a successful response without making an API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true, // Simulate success
                message: 'Login successful',
            });
        }, 1000); // Simulate a delay
    })
        .catch(error => {
            throw new Error('Login failed');
        });
};

export const SignUpService = data => {
    console.log('SignUp data:', data);

    // Simulate a successful response without making an API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true, // Simulate success
                message: 'Signup successful',
            });
        }, 1000); // Simulate a delay
    })
        .catch(error => {
            throw new Error('Signup failed');
        });
};

// export const LoginService = data => {
//     const url = `${BASEURL}auth/login`;
//     console.log('url', data)
//     return axios
//         .post(url, data)
//         .then(response => {
//             return response.data;
//         })
//         .catch(error => {
//             throw new Error(error);
//         });
// };
// export const SignUpService = data => {
//     const url = `${BASEURL}auth/signup`;
//     return axios
//         .post(url, data)
//         .then(response => {
//             return response.data;
//         })
//         .catch(error => {
//             throw new Error(error);
//         });
// };
export const ForgotService = data => {
    const url = `${BASEURL}auth/forgotPassword`;
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
export const ResetPassword = data => {
    const url = `${BASEURL}auth/resetPassword`;
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
export const ResentConfirmationCode = data => {
    const url = `${BASEURL}auth/resendConfirmationCode`;
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