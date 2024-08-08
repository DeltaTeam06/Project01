const express=require ("express");
const bodyParser =require ("body-parser");
const mongoose= require("mongoose");
const multer= require ("multer")

const app=express();
 
const ImageModel= require("./image.model")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const Storage=multer.diskStorage({
    destination:'uploads',
    filename :(req, file ,cb)=>{
    cb(null,file.originalname);
},
})
const upload=multer({
    storage:Storage,
}).single("testImage");

app.get("/",(req,res)=>{
    res.send("Upload File");
})
app.post("/upload",(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
          const newImage  = new  ImageModel({
            name:req.body.name, 
            image:{
                data:req.file.filename,
                contentType:"image/png",
            
            },
          });
          newImage.save()
          .then(()=>res.send("Successfully uploaded"))
          .catch(err=>console.log(err));
        }
          })
        
});
const MONGO_URL="mongodb://localhost:27017/mydatabase"
    // useNewUrlParser:true,
    // useUnifiedTopology:trueasync function main() 

    async function main() {
        await mongoose.connect(MONGO_URL);
    }
main()
.then(()=>{
    console.log("connected to db")
})
.catch((err)=>{
    console.log(err)
})
 const Schema = mongoose.Schema;


const PORT=process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`app is listening on ${PORT}`);
})