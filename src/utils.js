import axios from "axios";
import moment from 'moment';
import 'moment/locale/pt-br';

const Moment = (date) => moment(date).locale('pt-br');

const Axios = axios;

/**
 * Converts a milesecond to a string using the passed format. 
 * @param {number} mileseconds 
 * @param {string} format Format using the following keys: 'hh' to hour, 'mm' to minute and 'ss' to second.
 */

export { Axios, Moment };
