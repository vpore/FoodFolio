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
        const items = await Item.find({creator: req.userId});
        res.status(200).json(items);
    }
    catch(err){
        res.status(404).json({message: err.message});
    }
}

export const checkExpiration = async (req, res) => {
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