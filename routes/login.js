const express= require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const accountsModule = require('../module/accounts')

router.get('/', (req,res)=>
{
res.render('login/FormDangnhap.ejs')
})

router.post('/',async(req,res)=>
{
    const { userName, pass_word } = req.body;

   try
   {
     const check = await accountsModule.findOne({userName})
     
     if(!check)
     {
        res.render('login/FormDangnhap',
    {
        errorMessage:'Sai tên tài khoản hoặc sai định dạng email '
    })
     }
     const passwordMatch = await bcrypt.compare(pass_word,check.password)
    if(passwordMatch)
    {
        res.redirect('home')
    }
    else
    {
        res.render('login/FormDangnhap',
        {
            errorMessage:'sai mật khẩu '
        })
    }
   }catch{
    res.render('login/FormDangnhap',
        {
            errorMessage:'sai định dạng '
        })
   }
})
module.exports=router