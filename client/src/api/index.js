import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:5000'});

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).data.token}`;
    }
    return req;
});

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
export const createItem = (newItem) => API.post('/item', newItem);
export const fetchItems = () => API.get('/item');
export const fetchExpItems = () => API.get('/item/checkexp');