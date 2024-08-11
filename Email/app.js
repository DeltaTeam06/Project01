const express = require('express') 
const session = require('express-session');
const { initDB } = require('./dbConfig')
const cookieParser = require('cookie-parser')
const authRouter = require('./routes/authrouter')
const authenticateToken = require('./middleware/authenticateToken');
const app = express()

const dotenv = require('dotenv')
dotenv.config()

initDB()

//The urlencoded method within body-parser tells body-parser to extract data from the <form>
app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.use(cookieParser());

app.use(session({
  secret: 'No Key Is Secret', // Replace with your secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set secure to true if using HTTPS
}));


app.use('/', authRouter)

app.get('/',(req,res)=>{
  res.send('I am server at port 8000');
})


app.get('/signup', function(req, res) {
  res.sendFile(__dirname + '/signup.html')
})

app.get('/authenticate', function(req, res) {
  
  res.sendFile(__dirname + '/Otp.html')
})


app.get('/login', function(req, res) {
  res.sendFile(__dirname + '/login.html')
})

app.get('/dashboard', authenticateToken , function(req, res) {
  res.sendFile(__dirname + '/dashboard.html')
})


app.listen(8000, () => {
  console.log("Started Successfully")
})