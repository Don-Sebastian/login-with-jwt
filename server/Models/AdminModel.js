const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

// adminSchema.pre("save", async function (next) {
//   const salt = await bcrypt.genSalt();
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

adminSchema.statics.adminLogin = async function (email, password) {
  const admin = await this.findOne({ email });
  if (admin) {
    if (password === admin.password) {
      return admin;
    }
    throw Error("Incorrect Password");
  }
  throw Error("Incorrect Email");
};

module.exports = mongoose.model('admin', adminSchema); // admin collection