const mongoose= require('mongoose')

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
            
        },
        publishDate:
        {
            type:Date,
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

module.exports= mongoose.model('product',productSchema)