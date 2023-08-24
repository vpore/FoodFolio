import axios from 'axios';

const API = axios.create({ baseURL: "https://kitchen-backend-one.vercel.app/" });

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).data.token}`;
    }
    return req;
});

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
export const createItem = (newItem) => API.post('/item', newItem);
export const getItems = () => API.get('/item');
export const updateItem = (id, updatedItem) => API.patch(`/item/${id}`, updatedItem);
export const deleteItem = (id) => API.delete(`/item/${id}`);
export const getExpItems = () => API.get('/item/checkexp');