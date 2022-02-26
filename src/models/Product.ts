import {Schema,model,Document} from 'mongoose';

export interface Iproduct extends Document {
    name:string,
    price:number
 }

const productSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:false
    },
    userID:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps:true
});

export default model<Iproduct>('Product',productSchema);