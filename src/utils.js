import axios from "axios";
import { useSelector } from 'react-redux';
import 'moment/locale/pt-br';
import { store } from './store';

const Axios = axios;

Axios.interceptors.request.use((config) => {
    console.log(config);
    let { authentication = {} } = store.getState();
    if (authentication.token) config.headers['Authorization'] = 'Bearer ' + authentication.token;
    config.headers['Content-Type'] = 'application/json';

    // let url = config.url.slice(config.url.lastIndexOf('/')).replace(/\/|\?.*/gi, '');
    // store.dispatch(startLoading(url));

    return config;
}, (error) => {
    // let url = error.config.url.slice(error.config.url.lastIndexOf('/')).replace(/\/|\?.*/gi, '');
    // store.dispatch(stopLoading(url));
    return Promise.reject(error);
});

export { Axios };
