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

export const updateItem = async (id, updatedItem) => {
    try {
        const {data} = await api.updateItem(id, updatedItem);
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

export const deleteItem = async (id) => {
    try{
        await api.deleteItem(id);
    }
    catch(err){console.log(err);}
}