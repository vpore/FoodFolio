import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
    itemName: {type: String, required: true},
    quantity: {type: String, required: true},
    expiryDate: {type: Date, required: true},
    category: {type: String, required: true}, 
    name: {type: String, required: true},
    creator: {type: String, required: true},
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Item = mongoose.model('item', itemSchema);

export default Item;