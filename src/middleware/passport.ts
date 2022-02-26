import {Strategy,ExtractJwt,StrategyOptions} from 'passport-jwt';
import User from '../models/User';

const options:StrategyOptions = {
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
}

export default new Strategy(options,async(payload,done)=>{
    try {
        var userFound:any=await User.findById(payload.id);
        
        if(userFound){
            const user={
                id: userFound._id,
                email: userFound.email,
                username: userFound.username
            }
            return done(null,user);
        }
        else        return done(null,false);
    } catch (error) {
        console.log(error);
    }
});