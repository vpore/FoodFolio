import * as api from '../api';

export const createItem = async (item) => {
    try{
        const {data} = await api.createItem(item);
    }
    catch(err){console.log(err);}
}

export const getItems = async () => {
    try{
        const {data} = await api.fetchItems();
        return data;
    }
    catch(err){console.log(err);}
}

export const getExpItems = async () => {
    try{
        const {data} = await api.fetchExpItems();
        return data;
    }
    catch(err){console.log(err);}
}