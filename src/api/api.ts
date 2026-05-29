
import axios from 'axios'
import Config from 'react-native-config';
import './interceptors'

export const api = axios.create({
    baseURL: Config.APP_API_URL,
    timeout: 1000,
})

