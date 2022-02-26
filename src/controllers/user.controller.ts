import User,{Iuser} from '../models/User';
import {Request,Response} from 'express';
import jwt from 'jsonwebtoken';
import {validationResult} from 'express-validator';

const controller:any={};

function createToken(user:Iuser){
    return jwt.sign({id: user.id,email: user.email},`${process.env.SECRET_KEY}`,{expiresIn:'1h'});
}

controller.signUp=async(req: Request,res: Response)=>{
    try {
        validation(req,res);
        const {username,email,password}=req.body;
        const userFound=await User.findOne({email});
        if(userFound)res.status(400).json({msg:'This account already exists'});
        const newUser=new User({username,email,password});
        await newUser.save();
        const token=createToken(newUser);
        return res.status(201).json({token});
    }catch (error) {
        throw error;
    }
}

controller.signIn=async(req: Request,res: Response)=>{
    try {
        validation(req,res);
        const {email,password}=req.body;
        const userFound=await User.findOne({email:email});
        if(userFound){
            const isMatch=await userFound.comparePassword(password);
            if(!isMatch)
                return res.status(400).json({msg:'The email or password are incorrect'});
            const token=await createToken(userFound);
            return res.status(200).json({token});
        }
        else return res.status(404).json({msg:'User not found'});
                
    } catch (error: any) {
        throw error;
    }
}

controller.getAllUsers=async(req: Request,res: Response)=>{
    return res.json({users:await User.find()})
}

function validation(req: Request, res: Response){
        const errors=validationResult(req);
        if(errors.isEmpty())return;
        return res.status(403).json({errors: errors.array() });
}

export default controller;