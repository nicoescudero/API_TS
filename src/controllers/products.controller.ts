import {Request,Response} from 'express';
import Product from '../models/Product';
import User from '../models/User';
import {validationResult} from 'express-validator';
const controller:any={};

controller.createProduct=async(req: Request,res: Response)=>{
    try {
        validation(req,res);
        const {name,price}=req.body;
        const  {id}:any =req.user;
        const userFound=await User.findById(id);
        const image=req.file;
        if(userFound){
            const newProduct=new Product({name,price,image:image?.path,userID:id});
            await userFound.products.push(newProduct._id);
            await newProduct.save();
            await userFound.save();
            return res.status(201).json(newProduct);
        }else{
            return res.status(404).json({msg:'Error User'});
        }
    } catch (error) {
        throw error;
    }
}

controller.getProductById=async(req: Request,res: Response)=>{
    validation(req,res);
    const productFound=await Product.findById(req.params.id);
    if(!productFound)return res.status(404).json({msg: "Product not found"});
    return res.json({product:productFound});
}


controller.getAllProducts=async(req: Request,res: Response)=>{
    const allProducts=await Product.find();
    if(!allProducts)return res.status(404).json({msg: 'Not products found'});
    return res.json(allProducts);
}

controller.updateProduct=async(req: Request,res: Response)=>{
    validation(req,res);
    const {name,price}=req.body;
    const productFound= await Product.findByIdAndUpdate(req.params.id,{name,price,image:req.file},{new:true});
    if(!productFound)return res.status(404).json({msg: 'Product not found'});
    return res.json(productFound);
}

controller.deleteProduct=async(req: Request,res: Response)=>{
    try {
        validation(req,res);
        const  {id}:any =req.user;
        const product=await Product.findByIdAndDelete(req.params.id);
        const userFound=await User.findById(id);
        if(product && userFound){
            let index=await userFound.products.indexOf(req.params.id);
            await userFound.products.splice(index,1);
            await userFound.save();
            return res.json({msg: 'Product deleted'});    
        }
        else return res.status(404).json({msg: 'Product not found'});
    } catch (error) {
        throw error;
    }
}

function validation(req: Request, res: Response){
    const errors=validationResult(req);
    if(errors.isEmpty())return;
    return res.status(403).json({errors: errors.array() });
}

export default controller;