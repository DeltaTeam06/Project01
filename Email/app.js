const express = require('express') 
const { initDB } = require('./dbConfig')
const cookieParser = require('cookie-parser')
const authRouter = require('./routes/authRouter')
const sendMail = require('./controllers/sendMail');

const app = express()

const dotenv = require('dotenv')
dotenv.config()

initDB()

//middleware
app.use(express.static('public', {index : false}))

//The urlencoded method within body-parser tells body-parser to extract data from the <form>
app.use(express.urlencoded())

//middleware
app.use(express.json())
app.use(cookieParser())

//Routers
app.use('/', authRouter)

app.get('/',(req,res)=>{
  res.send('I am server at port 8000');
})


app.get('/signup', function(req, res) {
  
  res.sendFile(__dirname + '/signup.html')
})


app.get('/login', function(req, res) {
  res.sendFile(__dirname + '/login.html')
})

app.get('/dashboard', function(req, res) {
  
  res.sendFile(__dirname + '/dashboard.html')
})

app.get('/kalua', function(req, res) {
  res.sendFile(__dirname + '/kalua.html')
})

// app.get('/sendemail',sendMail);

app.listen(8000, () => {
  console.log("Started Successfully")
})