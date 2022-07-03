//Import Dependancies
const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Succesfully connected to MongoDB!");
  } catch (err) {
    console.log(`Couldn't connect to MongoDB. Error: ${err}`);
  }
};

module.exports = connectToDb;
