const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema user

const UserSchema = new Schema({
  name: { type: String, default: true },
  email: { type: String, default: true },
  password: { type: String, default: true },
  avatar: { type: String, default: true },
  date: { type: Date, default: Date.now }
});

module.exports = User = mongoose.UserSchema("users", UserSchema);
