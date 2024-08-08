const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the student
const studentSchema = new Schema({
  basicInfo: {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password:{type:String, required:true},
    phone: { type: Number},
    address: { type: String }
  },
  degree: {
    degreeName: { type: String},
    institution: { type: String },
    startDate: { type: Date},
    endDate: { type: Date}
  },
  images: [
    {
      url: { type: String},
      uploadDate: { type: Date, default: Date.now }
    }
  ], 

  role:{
    type:String,
    default:"student"
  },
  isVerified:{
    type:Boolean,
    default:false,
  }

}, {
//   timestamps: true
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
