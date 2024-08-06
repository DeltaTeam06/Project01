const mongoose = require("mongoose");

async function initDB() {
  try {
    await mongoose.connect('mongodb+srv://ranurag404:Luffy>>2*Kaido@cluster0.fjmbuyx.mongodb.net/testdb?retryWrites=true&w=majority&appName=Cluster0'
      , { dbName: 'employesDATA' })
    console.log("Connected to DB Successfully")
  } catch (err) {
    console.log("Error Connecting to DB")
    process.exit()
  }
}
module.exports = {
  initDB
}