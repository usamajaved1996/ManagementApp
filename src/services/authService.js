import axios from 'axios';
import { BASEURL } from '../constants/api';


// export const LoginService = data => {
//     console.log('Login data:', data);

//     // Simulate a successful response without making an API call
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve({
//                 success: true, // Simulate success
//                 message: 'Login successful',
//             });
//         }, 1000); // Simulate a delay
//     })
//         .catch(error => {
//             throw new Error('Login failed');
//         });
// };

// export const SignUpService = data => {
//     console.log('SignUp data:', data);

//     // Simulate a successful response without making an API call
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve({
//                 success: true, // Simulate success
//                 message: 'Signup successful',
//             });
//         }, 1000); // Simulate a delay
//     })
//         .catch(error => {
//             throw new Error('Signup failed');
//         });
// };

// export const LoginService = async (data) => {
//     const url = `${BASEURL}auth/login`;

//     try {
//         const response = await axios.post(url, data, {
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//         return response.data;
//     } catch (error) {
//         console.log('error', error.response.data)
//         throw new Error(error.response?.data);
//     }

// };

export const LoginService = (data) => {
    console.warn('LoginService', data);
    return axios
        .post(`${BASEURL}auth/login`, data)
        .then(response => response.data)
        .catch(error => {
            console.log('API error response:', error?.response?.data);

            if (error?.response?.data) {
                const { status, error: errorMsg, message } = error.response.data;
                console.warn('Processed error:', { status, message: errorMsg || message });

                return Promise.reject({ status, message: errorMsg || message });
            } else {
                return Promise.reject({ status: 500, message: "Unexpected error occurred." });
            }
        });
};


export const SignUpService = (data) => {
    console.warn('SignUpService', data);
    return axios
        .post(`${BASEURL}auth/signup`, data)
        .then(response => response.data)
        .catch(error => {
            console.log('API error response:', error?.response?.data);
            if (error?.response?.data) {
                const { status, error: errorMsg, message } = error.response.data;
                console.warn('Processed error:', { status, message: errorMsg || message });
                return Promise.reject({ status, message: errorMsg || message });
            } else {
                return Promise.reject({ status: 500, message: "Unexpected error occurred." });
            }
        });
};

export const ForgotService = (data) => {
    console.warn('ForgotService', data);
    return axios
        .post(`${BASEURL}auth/forgotPassword`, data)
        .then(response => response.data)
        .catch(error => {
            console.log('API error response:', error?.response?.data);
            if (error?.response?.data) {
                const { status, error: errorMsg, message } = error.response.data;
                console.warn('Processed error:', { status, message: errorMsg || message });
                return Promise.reject({ status, message: errorMsg || message });
            } else {
                return Promise.reject({ status: 500, message: "Unexpected error occurred." });
            }
        });
};
export const ResetPassword = (data) => {
    console.warn('ResetPassword', data);
    return axios
        .post(`${BASEURL}auth/resetPassword`, data)
        .then(response => response.data)
        .catch(error => {
            console.log('API error response:', error?.response?.data);
            if (error?.response?.data) {
                const { status, error: errorMsg, message } = error.response.data;
                console.warn('Processed error:', { status, message: errorMsg || message });
                return Promise.reject({ status, message: errorMsg || message });
            } else {
                return Promise.reject({ status: 500, message: "Unexpected error occurred." });
            }
        });
};

export const ResendConfirmationCode = (data) => {
    console.warn('ResendConfirmationCode', data);
    return axios
        .post(`${BASEURL}auth/resendConfirmationCode`, data)
        .then(response => response.data)
        .catch(error => {
            console.log('API error response:', error?.response?.data);
            if (error?.response?.data) {
                const { status, error: errorMsg, message } = error.response.data;
                console.warn('Processed error:', { status, message: errorMsg || message });
                return Promise.reject({ status, message: errorMsg || message });
            } else {
                return Promise.reject({ status: 500, message: "Unexpected error occurred." });
            }
        });
};
export const ConfirmEmailService = (data) => {
    console.warn('ConfirmEmailService', data);
    return axios
        .post(`${BASEURL}auth/confirmUser`, data)
        .then(response => response.data)
        .catch(error => {
            console.log('API error response:', error?.response?.data);
            if (error?.response?.data) {
                const { status, error: errorMsg, message } = error.response.data;
                console.warn('Processed error:', { status, message: errorMsg || message });
                return Promise.reject({ status, message: errorMsg || message });
            } else {
                return Promise.reject({ status: 500, message: "Unexpected error occurred." });
            }
        });
};

