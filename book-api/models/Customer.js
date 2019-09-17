var mongoose = require('mongoose');
import uniqueValidator from "mongoose-unique-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
var CustomerSchema = new mongoose.Schema(
{
	fname: {
        type: String,
        required: 'First Name is required',
		trim: true
	},
	lname: {
        type: String,
        required: 'Last Name is required',
		trim: true
	},
    email: {
      type: String,
      required: 'Please enter valid email id.',
      lowercase: true,
      index: true,
      unique: true
    },
	phone: {
        type: Number,
        required: 'Email Name is required',
		trim: true
    },
	
	passwordHash: { type: String, required: true },
    confirmed: { type: Boolean, default: false },
    confirmationToken: { type: String, default: "" }
}
   
);


CustomerSchema.methods.isValidPassword = function isValidPassword(password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

CustomerSchema.methods.setPassword = function setPassword(password) {
	this.passwordHash = bcrypt.hashSync(password, 10);
};

CustomerSchema.methods.setConfirmationToken = function setConfirmationToken() {
  this.confirmationToken = this.generateJWT();
};


CustomerSchema.methods.generateResetPasswordLink = function generateResetPasswordLink() {
  let hostname = "http://localhost:3007";
  return `${hostname}/reset_password/${this.generateResetPasswordToken()}`;
};


CustomerSchema.methods.generateResetPasswordToken = function generateResetPasswordToken() {
  return jwt.sign(
    {
      _id: this._id
    },
    "worldisfullofdevelopers",
    { expiresIn: "1h" }
  );
};

CustomerSchema.methods.generateJWT = function generateJWT() {
  return jwt.sign(
    {
      email: this.email,
      confirmed: this.confirmed
    },
    "worldisfullofdevelopers"
  );
};
CustomerSchema.methods.toAuthJSON = function toAuthJSON() {
  return {
    email: this.email,
    confirmed: this.confirmed,
    token: this.generateJWT()
  };
};


CustomerSchema.plugin(uniqueValidator, { message: "This email is already taken" });

export default mongoose.model("Customer", CustomerSchema);
