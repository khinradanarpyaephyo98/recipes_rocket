import bodyParser from "body-parser";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from 'dotenv';

const app= express();
dotenv.config({path:'.env'})

import {userRouter} from "./src/routes/users.js";
import { recipeRouter } from "./src/routes/recipes.js";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))


app.use(cors());
app.use("/auth", userRouter);
app.use("/recipes",recipeRouter);

mongoose.connect(process.env.MONGODB_URL)
mongoose.connection.on('connected', () => console.log('connected'));




