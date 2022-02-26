import mongoose from 'mongoose';
let uri:string='';
let {DB_URI_DEV,DB_URI_PRO,NODE_VAR}=process.env;
if(NODE_VAR==='development')uri=`${DB_URI_DEV}`;
else uri=`${DB_URI_PRO}`;

let options:any={
    useUnifiedTopology:true,
    useNewUrlParser:true,
}

mongoose.connect(uri,options);


const connection=mongoose.connection;

connection.once('open',()=>{
    console.log('Started DB');
});

connection.on('error',(err)=>{
    console.log(err);
    process.exit(0);
})