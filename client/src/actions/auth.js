import * as api from '../api';

export const signin = async (formData, navigate, loginG, handleErr) => {
    try {
        const {data} = await api.signIn(formData);
        localStorage.setItem('profile', JSON.stringify({data}));
        navigate('/home');
        loginG();
    } catch (error) {
        handleErr(error);
    }
}

export const signup = async (formData, navigate, loginG) => {
    try {
        const {data} = await api.signUp(formData);
        localStorage.setItem('profile', JSON.stringify({data}));
        navigate('/home');
        loginG();
    } catch (error) {
        console.log(error);
    }
}