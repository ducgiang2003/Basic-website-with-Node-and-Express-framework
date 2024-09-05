const express = require('express')
const router = express.Router()
const User = require('../module/user')
router.get('/', (req,res)=>
{
    res.render('home/complain.ejs')
})

router.post('/',async(req,res)=>
{
const{name}=req.body;
try
{
const newAA = new User({name});
await newAA.save();
res.redirect('home')
}catch{
res.render('home/complain.ejs',{
    errorMessage:'Vui lòng nhập thông tin khiếu nại vào'
})
}
})
module.exports=router