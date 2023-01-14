import mongoose from "mongoose";
import Item from "../models/item.js";

export const createItem = async (req, res) => {
    const item = req.body;
    const newItem = new Item({...item, creator: req.userId, createdAt: new Date().toISOString()});
    try{
        await newItem.save();
        res.status(201).json(newItem);
    }
    catch(err){
        res.status(409).json({message: err.message});
    }
}

export const getItems = async (req, res) => {
    try{
        const items = await Item.find();
        res.status(200).json(items);
    }
    catch(err){
        res.status(404).json({message: err.message});
    }
}