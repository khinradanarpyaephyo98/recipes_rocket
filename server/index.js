import bodyParser from "body-parser";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
const PORT = 9999;

const app= express();

import {userRouter} from "./src/routes/users.js";
import { recipeRouter } from "./src/routes/recipes.js";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))


app.use(cors());
app.use("/auth", userRouter);
app.use("/recipes",recipeRouter);


mongoose
    .connect('mongodb+srv://krpp98:krpp12345@krpp98.wcjwiao.mongodb.net/receipes')
    
app.listen(PORT, ()=>{
    console.log(`App is running at ${PORT}`)
})
