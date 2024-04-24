const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Product = require('./product');

const partnerSchema = new Schema({
  name: {
    type: String,
    required: true // Bỏ dấu ':' sau require
  },
  country: {
    type: String,
    required: true
  }
});

// Giữ nguyên phần pre('remove') và model
partnerSchema.pre('remove',function(next){
    //Find product of this partner => must know partner id to equal partner in schema 
    
    Product.find({partner:this.id},(err,products))
    
    })
module.exports = mongoose.model('Partner', partnerSchema);
