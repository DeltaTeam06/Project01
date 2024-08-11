const UserModel = require("../models/userModel");
const { Router } = require('express');
const sendMail = require("./sendMail");
const jwt = require('jsonwebtoken');
const authRouter = Router();

let otpass = Math.floor(Math.random() * 9000) + 1000;

// Signup
const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser && existingUser.verify === true) {
      return res.status(400).send({ status: 'error', msg: "User already exists with this email" });
    }

    if(!existingUser){
    const newUser = await UserModel.create({ name, email, password, otp: otpass })
    }
    else{
      const updateResult = await UserModel.updateOne({ email: email }, {name,password,password, otp: otpass });
    }

    sendMail(email, otpass);
    req.session.email = email;
    
    res.redirect('/authenticate');
  } catch (err) {
    const indexes = await UserModel.collection.indexes();
    res.status(500).send({ status: 'error', err: err , indexes});
  }
};

// OTP verification
const otpp = async (req, res) => {
  let { otp } = req.body;
  const email = req.session.email;

  if (!email) {
    return res.status(400).send({ status: 'error', msg: 'Email is missing from the session.' });
  }
  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.status(404).send({ status: 'error', msg: `User not found for email: ${email}` });
  }

  if (otp == user.otp) {
    const updateResult = await UserModel.updateOne({ email },{ verify : true})
    req.session.destroy(); 
    return res.redirect('/login');
  } else {
    return res.status(500).send({ status: 'error', msg: 'OTP does not match' });
  }
};


// Resend OTP
const resend = async (req, res) => {
  try {
    otpass = Math.floor(Math.random() * 9000) + 1000;

    const email = req.session.email;
    const updateResult = await UserModel.updateOne({ email: email }, { otp: otpass });

    await sendMail(email, otpass);
    authRouter.post('/authenticate');
    res.send({ status: 'success', msg: "OTP is sent" });
  } catch (error) {
    console.log(error);
  }
};


// Login
const login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await UserModel.findOne({ email, password })
    

    if (!user) {
      res.status(401).send({ status: 'error', msg: "Invalid User" });
    } else {
      const userPayload = { email: user.email, name: user.name };   

      
      if(user.verify === true){
        const token = jwt.sign(userPayload, 'No Key Is Secret', {
          algorithm: "HS384",
          expiresIn: "1d",
        });
        // console.log(token);
        res.cookie("jwt", token, { maxAge: 24 * 60 * 60 * 1000});
        res.redirect('/dashboard');
      }else{
        res.status(500).send({ status: 'User Not verified error', err: err });
      }
    }
  } catch (err) {
    res.status(500).send({ status: 'why this error', err: err });
  }
};



module.exports = {
  signup, login, otpp, resend
};
