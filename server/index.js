import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from 'dotenv';

import userRoutes from './routes/user.js';
import itemRoutes from './routes/item.js';
import emailRoute from './routes/email.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use('/user', userRoutes);
app.use('/item', itemRoutes);
app.use('/sendemail', emailRoute);

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