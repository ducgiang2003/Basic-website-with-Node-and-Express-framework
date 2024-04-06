//This file will make a partner modulde( partner schema ) 

const mongoose = require('mongoose')

const partnerSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        country:{
             type:String,
             required:true
        },
        numberContact:{
            type:String,
            required:true
        },
        postition:{
            type:String,
            required:true
        }
    }

)
module.exports=mongoose.model('Partner',partnerSchema)