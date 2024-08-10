const express = require('express')
const path = require("path");
const mongoose = require('mongoose');
const Student = require("./models/student.js")
const app = express()
var cors = require('cors');
const port = 3000
let pup = require("puppeteer");
const { profile } = require('console');
const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })



const uri = "mongodb+srv://tecnocrates006:701196@student-data.wrr0t.mongodb.net/?retryWrites=true&w=majority&appName=student-data"; // atalash link

app.use(express.json()); 
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
main().then(console.log("db connected success")).catch(err => console.log(err));
app.set("views", path.join(__dirname, "views"));


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
     return cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const upload = multer({storage})



async function main() {
  await mongoose.connect(uri);
}


app.get("/", (req, res)=>{
  res.render("res.ejs");
})

app.post("/profile/:id", upload.single('avatar'), async(req, res)=>{
  const { id } = req.params;
  console.log(req.file.path);
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      {
        'profile': req.file.path,
        
      },
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({ message: 'Info updated in DB', student: updatedStudent });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
})



app.post("/images/:id", upload.single('avatar'), async(req, res)=>{

    let {id} = req.params;
  const result = await Student.findByIdAndUpdate(
    id,
    {
      $push: {
        images: {
          url: req.file.path,
          uploadDate: new Date()  // This will use the current date by default
        }
      }
    })

    res.send(result);
})






//  Signup Route
app.post("/signUp", async(req, res)=>{
    console.log(req.body);
    let {name, email, password} = req.body.basicInfo
    const newStudent = new Student({'basicInfo.name':name, 'basicInfo.email':email, 'basicInfo.password':password});
    let result =  await newStudent.save();
    res.send("done"); 
})

// Login Route
app.post("/login", async(req, res)=>{
    let {email, password} = req.body;
    let isValid = await Student.findOne({'basicInfo.email': email});

     console.log(isValid);
    if(isValid &&  isValid.basicInfo.password == password){

      if(isValid.role == "student"){
        res.status(200).json(isValid);
      } else {
        res.status(200).json({frofile:"admin DashBoard"});
      }
       

    } else {
      res.status(402).json({message:"user not found"});
    }
    
})

// All verified user
app.get("/alluser", async(req, res)=>{
  const students = await Student.find({
    role: 'student',
    isVerified: true
  });


    res.status(200).json({students});
})


// get Student data
app.get("/user/:id", async(req, res)=>{
    let {id} = req.params;
    let user = await Student.findById(id);
    res.status(200).json(user);
})

// Update user info
app.get("/edit/:id", async(req, res)=>{
  let {id} = req.params;
  let user = await Student.findById(id);
  res.status(200).json(user);
})




//update user info from User DashBoard
app.post('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { basicInfo } = req.body;

  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      {
        'basicInfo.address': basicInfo.address,
        'basicInfo.phone': basicInfo.phone
      },
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({ message: 'Info updated in DB', student: updatedStudent });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


// Verified : True from Admin dashBoard

app.post('/verify/:id', async (req, res) => {
  const { id } = req.params;
  const { basicInfo } = req.body;

  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      {
        'isVerified': true
      },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({ message: 'Info updated in DB', student: updatedStudent });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


//verify all student by admin
app.use('/verifyAll', (req, res, next) => {
  const { ids } = req.body;
  if (!Array.isArray(ids) || ids.some(id => !mongoose.Types.ObjectId.isValid(id))) {
    return res.status(400).json({ message: 'Invalid IDs format' });
  }
  next();
});

// Route to update multiple students based on their IDs
app.post('/verifyAll', async (req, res) => {
  const { ids} = req.body;

  try {
    const result = await Student.updateMany(
      { _id: { $in: ids } },  
      { 'isVerified':true },
      { new: true, runValidators: true }
    );

    if (result.nModified === 0) {
      return res.status(404).json({ message: 'No students found or updated' });
    }

    res.status(200).json({ message: 'Students updated successfully', result });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});





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



app.get('/cert', async(req, res) => {
    let {info} = req.query;
    let data = JSON.parse(info);
    console.log(data);
  res.render("certificate.ejs", {data});
})

//Pfd converter
app.post("/resume/:id", async (req, res) => {
  let {id} = req.params;
  let info = await Student.findById(id);
  // let {info} = req.body;
  console.log(info.basicInfo.name);
try {
const browser = await pup.launch({ timeout: 0 });
const page = await browser.newPage();


await page.goto(`${req.protocol}://${req.get('host')}/cert?info=${encodeURIComponent(JSON.stringify(info))}`, {
  waitUntil: "networkidle2"
});

await page.setViewport({ width: 1600, height: 1050 });

const todaDate = new Date();
const pdfFileName = `${todaDate.getTime()}.pdf`;
const pdfPath = path.join(__dirname, "./public/files", todaDate.getTime() + ".pdf");


await page.pdf({
  path: pdfPath,
  format: "A4",
  printBackground: true
});
await browser.close();

res.set({
  "Content-Type": "application/pdf",
  // "Content-Disposition": `attachment; filename="${todaDate.getTime()}.pdf"`
});

res.send("pdf generated");
// res.redirect(`/pdf-generated?pdfName=${pdfFileName}`);
  // if(id == "download"){
  //   res.download(pdfPath);
  // }else {
  //   res.sendFile(pdfPath);
  // }
    


} catch (err) {
console.error('Error generating PDF:', err);
res.status(500).send('An error occurred while generating the PDF.');
}
});

// after pdf generated
app.get("/pdf-generated", (req, res)=>{
  let {pdfName} = req.query;
  console.log(pdfName);
res.render("option.ejs", {pdfName});
})

// for preview resume
app.get("/preview/:pdfName", (req, res) => {
console.log( req.params.pdfName)
const filePath = path.join(__dirname, "./public/files", req.params.pdfName);  
res.sendFile(filePath);
})

// for download resume
app.get("/download/:pdfName", (req, res) => {
console.log( req.params.pdfName)
const filePath = path.join(__dirname, "./public/files", req.params.pdfName);  
res.download(filePath);
})




app.listen(port, () => {
  console.log(`Example app listening on port  http://localhost:${port}`)
})