const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// userSchema.pre("save", async (next) => {
//   const salt = await bcrypt.genSalt(10);
//   await bcrypt.hash(this.password, salt);
//   next();
// });

const User = mongoose.model("User", userSchema);
module.exports = User;
