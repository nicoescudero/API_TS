import {Schema,model,Document} from 'mongoose';
import bcrypt from 'bcrypt';

export interface Iuser extends Document{
    username:string,email:string, password: string,products:string [],
    comparePassword: (password:string)=>Promise<boolean>
}

const userSchema=new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        trim:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    products:[{
            type: Schema.Types.ObjectId,
            ref: 'Product',
        }],
},{
    timestamps:true
});

userSchema.pre<Iuser>('save',async function(next){
    const user=this;
    if(!user.isModified('password'))return next();
    const salt=await bcrypt.genSalt(10);
    const hash=await bcrypt.hash(user.password,salt);
    user.password = hash;
    next();
});

userSchema.methods.comparePassword=async function(password:string):Promise<boolean>{
    return await bcrypt.compare(password,this.password);
}


export default model<Iuser>('User',userSchema);