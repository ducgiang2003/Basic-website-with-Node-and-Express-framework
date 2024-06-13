const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost/Test_01")
const sneakerSchema = new mongoose.Schema({
      name:{
        type:String,
       
      },
      size :{
        type: Number,
    
      },
      price:{
        type:Number,
      },
      number:{
        type:String,
      }


})
module.exports=mongoose.model('sneaker',sneakerSchema)