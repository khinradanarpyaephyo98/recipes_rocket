import { RecipeModel } from "../models/Recipes.js";
import express from 'express';
import mongoose from "mongoose";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./users.js";

const router = express.Router();

router.get('/', (req, res) => {
    console.log('GET request to /users');
    res.send('User list');

  });


router.get("/", async (req, res) => {
    try {
      const result = await RecipeModel.find({});
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get("/home", async (req, res) => {
    try {
      const recipe = await RecipeModel.find({});
      const user = await UserModel.findById(req.body.userID);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.post("/",verifyToken,async (req,res)=>{
    const recipe = new RecipeModel({
        _id : new mongoose.Types.ObjectId(),
        name : req.body.name,
        ingredients: req.body.ingredients,
        instructions:req.body.instructions,
        imageUrl : req.body.imageUrl,
        cookingTime :req.body.cookingTime,
        userOwner : req.body.userOwner,
    });
    console.log("recipe 1",recipe);
    try{
        await recipe.save();
        return res.json({"message":"k"})
    }catch(e){
        console.log({
            "message" : "error"
        });
    }
})

router.put("/",async (req,res)=>{
    const recipe = await RecipeModel.findById(req.body.recipeID);
    const user = await UserModel.findById(req.body.userID);
    try{
        user.savedRecipes.push(recipe);
        await user.save();
        res.status(201).json({savedRecipes: 
        user.savedRecipes});
    }catch(e){
        res.status(500).json(e);
    }
    
})

router.get("/savedRecipes/id/:userId", async (req,res)=>{
    try{
        const user = await UserModel.findById(req.params.userId);
        res.status(201).json({savedRecipes: user?.savedRecipes});
    }catch(e)
    {
        res.json(e);
    }
})

router.get("/savedRecipes/:userId", async (req,res)=>{
    
    try{
        const user = await UserModel.findById(req.params.userId);
        console.log(user);
        const savedRecipes = await RecipeModel.find({
            _id : {$in : user.savedRecipes},
        })
        console.log(savedRecipes);
        res.status(201).json({ savedRecipes });
    }catch(e)
    {
        console.log(e);
    }
})


export {router as recipeRouter};