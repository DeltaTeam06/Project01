const mongoose= require("mongoose");

const ImageSchema= mongoose.Schema({
name:{
    type:String,
    required:true,
},
image:{
data:Buffer,
contentType:String,
}
})
const Images=
module.exports=ImageModel=mongoose.model('imageModel',ImageSchema);;