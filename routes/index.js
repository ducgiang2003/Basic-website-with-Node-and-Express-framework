const express = require('express')
const router = express.Router()
//Get action to index view 
router.get('/',(req,res,next) =>
{
    res.redirect('login')
})

//Export module to use another class such as sever.js
module.exports=router