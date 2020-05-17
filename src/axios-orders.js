import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-app-42a9c.firebaseio.com/'
});

export default instance;