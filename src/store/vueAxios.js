import axios from 'axios/index'

const VueAxios = axios.create({
    baseURL: 'http://localhost/api',
    headers: {
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json'
    },
});

VueAxios.interceptors.request.use(function (config) {

    /*if (localStorage.getItem('token')) {
        config.headers.token = localStorage.getItem('token')
    } else {
        //@TODO uncomment and remove else part with real application
        config.headers.token = 'test';
    }*/

    config.headers.token = 'test';

    return config;
});

VueAxios.interceptors.response.use(undefined, function (error)  {
    const statusCode = error.response ? error.response.status : null;
    if (statusCode) {
        if (statusCode === 401) {
            window.location.href = '/login';
        } else if (statusCode === 500) {
            console.log(error.response.data);
        } else if (statusCode === 400) {
            alert(error.response.data.message);
        }
    }

    return Promise.reject(error);
})

export default VueAxios;