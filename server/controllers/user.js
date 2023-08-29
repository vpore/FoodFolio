import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

import User from '../models/user.js';

dotenv.config();
const secret = process.env.secret;

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {        
        const existingUser = await User.findOne({email});
        if(!existingUser) return res.status(400).json({message: 'User doesn\'t exist. Please Sign Up'});

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect) return res.status(400).json({message: 'Incorrect Password'});

        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, secret);

        res.status(200).json({result: existingUser, token});

    } catch (error) {
        return res.status(400).json({message: 'Something went wrong'});
    }

}

export const signup = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {        
        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({error: "User already exists. Please Sign In"});

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({email, password: hashedPassword, name: `${firstName} ${lastName}`});
        const token = jwt.sign({email: result.email, id: result._id}, secret);

        res.status(200).json({result, token});

    } catch (error) {
        return res.status(400).json({error: 'Something went wrong'});
    }
}