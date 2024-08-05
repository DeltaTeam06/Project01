const express = require('express')
require('dotenv').config()
const path = require("path");
const mongoose = require('mongoose');
const User = require("./models/users.js")
const app = express()
var cors = require('cors');
var bodyParser = require('body-parser')
app.use(bodyParser.json())
const port = 3000


app.use(cors());
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
main().then(console.log("db connected success")).catch(err => console.log(err));
app.set("views", path.join(__dirname, "views"));


async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/mangos');
}

//   let pass1 = new User({
//   username:"prakash",
//   email: "prakash@123",
//   password: "123456",
//   id: "11"
//  })

// pass1.save();




app.get('/', async(req, res) => {
    
  res.render("nda.ejs");
})

// save new password
app.post("/signUp", async(req, res)=>{
      console.log(req.body);
  const newUser = new User(req.body);
    let result =  await newUser.save();
    res.send(result);
})


app.post("/login", async(req, res)=>{
    let {username, password} = req.body;
    let isUser = await User.findOne({
      $or: [{ username: username }, { email: username }]
    });

     console.log(isUser);
    if(isUser &&  isUser.password == password){
        res.status(200).json(isUser);

    } else {
      res.status(402).json(isUser);
    }
    
    
})

// delte route
// app.delete("/", async(req,res)=>{
//       let {id} = req.body;
//       console.log(id);
//       let del = await Password.deleteOne({id: `${id}`});
//       console.log(del);
//       res.send(del);
// })

// app.put("/", async(req, res)=>{
//       let {id} = req.body;
//       console.log(req.body);
//       let result = await Password.findOneAndReplace({id: `${id}`}, req.body);
//       res.send(result);
// })

app.listen(port, () => {
  console.log(`Example app listening on port  http://localhost:${port}`)
})