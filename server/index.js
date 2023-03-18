import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from 'dotenv';

import userRoutes from './routes/user.js';
import itemRoutes from './routes/item.js';
import checkExpirations from "./helpers/checkExpirations.js";

const app = express();
dotenv.config();

const oneDayTime = 24 * 60 * 60 * 1000;

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use('/user', userRoutes);
app.use('/item', itemRoutes);

const checkExpirationsDaily = async () => {
    setTimeout(async () => {
        await checkExpirations();
        await checkExpirationsDaily();
    }, oneDayTime);
};

checkExpirations();
checkExpirationsDaily();

const PORT = process.env.PORT;

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on Port ${PORT}`)))
    .catch((error) => console.log(error));