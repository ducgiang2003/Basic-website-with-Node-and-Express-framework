const mongoose = require('mongoose')
const validator = require('validator');
mongoose.connect('mongodb://localhost/Test_01')
const bcrypt =require('bcryptjs')
const accountSchema = new mongoose.Schema({
 userName:{
     type:String,
     required: true,
     validate: [validator.isEmail, 'Invalid email format. Must be an email.'],
 },
 password:{
    type:String,
    required: true
 },
 
}) ;
accountSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
    next();
  });

module.exports=mongoose.model('accounts',accountSchema)