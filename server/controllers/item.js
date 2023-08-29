import mongoose from "mongoose";
import Item from "../models/item.js";
import Notification from "../models/notification.js";
import generateNotification from "../helpers/generateNotification.js";

export const createItem = async (req, res) => {
    const item = req.body;
    const newItem = new Item({...item, creator: req.userId, createdAt: new Date().toISOString()});
    try{
        await newItem.save();
        await generateNotification(
            newItem.expiryDate,
            newItem.creator,
            newItem._id
        );
        res.status(201).json(newItem);
    }
    catch(err){
        res.status(409).json({message: err.message});
    }
}

export const getItems = async (req, res) => {
    try{
        const items = await Item.aggregate([{$match: {creator: req.userId}}, {$sort: {expiryDate: 1}}]);
        res.status(200).json(items);
    }
    catch(err){
        console.log(err);
        res.status(404).json({message: err.message});
    }
}

export const updateItem = async (req, res) => {
    const {id} = req.params;
    const newQuantity = Object.keys(req.body)[0];
    
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No item with that id");
    const updatedItem = await Item.findByIdAndUpdate(id, {$set: {quantity: newQuantity}}, {new: true});
    res.json(updatedItem);
}

export const deleteItem = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No item with that id");
    await Item.findByIdAndRemove(id);

    const notifications = await Notification.find({ itemId: id });
    notifications.map(async notification => {
        await Notification.deleteOne({_id: notification._id})
    });
    res.json({message: 'Item Deleted!'});
}

export const getExpItems = async (req, res) => {
    try {
        const expItems = await Item.aggregate([
            {$match: {
                creator: req.userId, 
                $expr: {
                  $lte: [
                    { $dateDiff: { startDate: new Date(), endDate: "$expiryDate", unit: "day" } },
                    7
                  ]
                }
            }},
            {$sort: {expiryDate: 1}}
        ]).exec();
        
        res.status(200).json(expItems);
    }
    catch(err){
        console.log(err);
        res.status(404).json({message: err.message});
    }
}