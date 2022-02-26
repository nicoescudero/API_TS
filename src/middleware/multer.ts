import multer from 'multer';
import path from 'path';
import {nanoid} from 'nanoid';

const storage=multer.diskStorage({
    destination:path.join(__dirname,'../public/uploads'),
    filename:(req,file,cb)=>{
        cb(null,nanoid()+path.extname(file.originalname));
    }
});

const upload=multer({
    storage,
    limits:{fileSize:18000000},
    fileFilter:(req,file,cb,)=>{
        const types= /png|jpg|jpeg/;
        const mimetype=types.test(file.mimetype);
        const extname=types.test(path.extname(file.originalname));
        if(mimetype && extname) return cb(null,true);
        return cb(null,false);        
    },
}).single('image');

export default upload;