import axios from "axios";
import { useSelector } from 'react-redux';
import 'moment/locale/pt-br';

//const user = useSelector(state => state.authentication);


const Axios = axios.create({
    baseURL: 'https://quinto-log-back.herokuapp.com/',
    //headers: {'Authorization': 'Barear '} //+ user.token}
});

export { Axios };
