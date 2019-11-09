import axios from "axios";
import { useSelector } from 'react-redux';
import 'moment/locale/pt-br';

const user = useSelector(state => state.authentication);

const Axios = axios.create({
    baseURL: 'http://localhost:8181/',
    headers: {'Authorization': 'barear '+ user.token}
});

export { Axios };
