import * as api from '../api';

export const createItem = async (item) => {
    try{
        const {data} = await api.createItem(item);
    }
    catch(err){console.log(err);}
}

export const getItems = async () => {
    try{
        const {data, status} = await api.getItems();
        const responseObj = {data, status};
        return responseObj;
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
        const {data, status} = await api.getExpItems();
        const responseObj = {data, status};
        return responseObj;
    }
    catch(err){console.log(err);}
}

export const deleteItem = async (id) => {
    try{
        await api.deleteItem(id);
    }
    catch(err){console.log(err);}
}