// import axios from 'axios';
// import API_URL from './config';
// import { getCookie } from '../utils';
// import logout from '../redux/logout';

// const BASE_URL = window.location.origin + '/api';

// const api = (endpoint, payload = {}, method = 'POST', cancelToken = null) => {
//
//     const url = new URL(`${BASE_URL}/${endpoint}/`);
//
//     if (method === 'GET') {
//         url.search = new URLSearchParams(JSON.stringify(payload));
//     }
//
//     let options = {
//         cancelToken,
//         url,
//         method,
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//         },
//     }
//
//     const token = getCookie('csrftoken');
//
//     if (token) {
//         options.headers['X-CSRFToken'] = token;
//     }
//
//     if (method === 'POST' && payload && Object.keys(payload).length) {
//         options.data= JSON.stringify(payload)
//     }
//
//     return axios(options)
//         .then(async (res) => {
//
//             const {status} = res
//
//             if (status >= 200 && status < 300) {
//                 const { data } = res;
//                 return data;
//             } else {
//
//                 if (status === 401 || status === 403) {
//                     logout()
//                 }
//
//                 if (status === 500) {
//                     throw new Error(process.env.REACT_APP_TRANSLATE_API_ERRROR ? res.data : 'Ошибка связи с сервером');
//                 }
//                 throw res.data;
//             }
//         }, error => {
//             const { response } = error;
//             const { data, status } = response || {};
//
//             if (status === 401 || status === 403) {
//                 logout()
//             }
//
//             if (status === 500 || status === 400) {
//                 throw process.env.REACT_APP_TRANSLATE_API_ERRROR ? data || error : 'Ошибка связи с сервером';
//             }
//
//             throw data || error
//         });
// };

export function login({email, password}) {
    return new Promise(resolve => {
        setTimeout(() => {resolve(true)}, 0)
    });

    // return api(API_URL.login, {username, password})
}

export function signup({email, password}) {
    return new Promise(resolve => {
        setTimeout(() => {resolve(true)}, 0)
    });

    // return api(API_URL.login, {username, password})
}

export function userMe() {

    return new Promise(resolve => {
        setTimeout(() => {resolve(null)}, 0)
    });
    // return api(API_URL.userMe, null)
}
