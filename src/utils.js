import axios from "axios";
import { useSelector } from 'react-redux';
import 'moment/locale/pt-br';
import { store } from './store';
import { startLoading, stopLoading, showToast } from "./actions/System";
import { signOut } from "./actions/Authentication";

const Axios = axios;

Axios.interceptors.request.use((config) => {
    let { authentication = {} } = store.getState();
    if (authentication.token) config.headers['Authorization'] = 'Bearer ' + authentication.token;
    config.headers['Content-Type'] = 'application/json';

    console.log('in');

    const splitUrl = config.url.split('/');
    const url = config.method === 'put' ? splitUrl[splitUrl.length -2 ] : splitUrl.pop();

    console.log('in2');
    store.dispatch(startLoading(url));

    return config;
}, (error) => {
    console.log(error);
    const splitUrl = error.config.url.split('/');
    const url = error.config.method === 'put' ? splitUrl[splitUrl.length -2 ] : splitUrl.pop();
    store.dispatch(stopLoading(url));

    return Promise.reject(error);
});

Axios.interceptors.response.use((response) => {
    const splitUrl = response.config.url.split('/');
    const url = response.config.method === 'put' ? splitUrl[splitUrl.length -2 ] : splitUrl.pop();
    store.dispatch(stopLoading(url));
    
    return response;
}, (error) => {
    const splitUrl = error.config.url.split('/');
    const url = error.config.method === 'put' ? splitUrl[splitUrl.length -2 ] : splitUrl.pop();
    store.dispatch(stopLoading(url));

    if(error && error.response && error.response.status) {
        switch(error.response.status) {
            case 401:
                store.dispatch(showToast({
                    open: true,
                    message: 'Usuário não logado',
                    type: 'error'
                }));
            break;                
            case 403:
                store.dispatch(showToast({
                    open: true,
                    message: 'Acesso negado',
                    type: 'error'
                }));
                store.dispatch(signOut());
            break;                
            case 404:
                store.dispatch(showToast({
                    open: true,
                    message: 'Serviço não encontrado',
                    type: 'error'
                }));
                break;
            case 412:
                store.dispatch(showToast({
                    open: true,
                    message: error.response.data,
                    type: 'error'
                }));
                break;
            case 500:
                store.dispatch(showToast({
                    open: true,
                    message: error.response.data || 'Erro ao processar dados',
                    type: 'error'
                }));
                break;
            case 503:
            case 504:
                store.dispatch(showToast({
                    open: true,
                    message: 'Tente novamente mais tarde',
                    type: 'error'
                }));
                break;
            default:
                store.dispatch(showToast({
                    open: true,
                    message: 'Erro no servidor',
                    type: 'error'
                }));
                break;
        }
    } else {
        store.dispatch(showToast({
            open: true,
            message: 'Erro ao processar requisição',
            type: 'error'
        }));
    }

    return Promise.reject(error);
});

export { Axios };
