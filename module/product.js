const mongoose= require('mongoose')
const Decimal128 = require('mongodb').Decimal128
const path = require('path')
//This is the path to cover and store it 
const converImageBasePath = "uploads/productCovers"

const productSchema = new mongoose.Schema(
    {
        title:
        {
            type:String,
            required:true
        },
        description:
        {
            type:String,
            required:true
            
        },
        publishDate:
        {
            type:Date,
            required:true,
        },
        productCount:
        {
            type:Number,
            required:true,
        },
        createAt:
        {
            type:Date,
            required:true,
            default:Date.now
        },
        coverImageName:{
           type:String,
           required:true
        },
        price:{
        type:Decimal128,
        },
        partner:{
            //This type will reference other mongoose module in project 
            //mongoose.module(''Object_Module,value)
            //Must correct name set in mongoose module
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'Partner'
        }
    }
)
//Make a virtual img path properties
//coverImagePath will return to String with get method
productSchema.virtual('coverImagePath').get(function(){
     //Check if have img file in project
if(this.coverImageName!=null)
{
  //return path (/+uploads/productCovers/encodeImgName)
  return path.join('/',converImageBasePath,this.coverImageName)
}
}) 

module.exports= mongoose.model('product',productSchema)
module.exports.converImageBasePath=converImageBasePath 