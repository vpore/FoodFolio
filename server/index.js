import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import cron from 'node-cron';

import userRoutes from './routes/user.js';
import itemRoutes from './routes/item.js';
import CheckExpirations from "./helpers/CheckExpirations.js";

const app = express();
dotenv.config();

const oneDayTime = 24 * 60 * 60 * 1000;

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use('/user', userRoutes);
app.use('/item', itemRoutes);

// cron.schedule("*/10 * * * *", () => {
//   CheckExpirations();
// });

// const checkExpirationsDaily = async () => {
//     setTimeout(async () => {
//         // await checkExpirations();
//         await checkExpirationsDaily();
//         console.log("helloo");
//     }, 10000);
// };

// checkExpirations();
// checkExpirationsDaily();

const PORT = process.env.PORT;

mongoose.set("strictQuery", false);

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on Port ${PORT}`)))
    .catch((error) => console.log(error));