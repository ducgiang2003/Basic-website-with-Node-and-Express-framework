const express= require('express')
const router = express.Router()

const accountsModule = require('../module/accounts')

router.get('/', (req,res)=>
{
res.render('login/FormDangnhap.ejs')
})

router.post('/',async(req,res)=>
{
   try
   {
     const check = await accountsModule.findOne({userName:req.body.userName})
     
     if(!check)
     {
        res.render('login/FormDangnhap',
    {
        errorMessage:'Sai tên tài khoản '
    })
     }
     const passwordMatch = await accountsModule.findOne({userName:req.body.userName})
    if(!passwordMatch)
    {
        res.render('login/FormDangnhap',
        {
            errorMessage:'sai mật khẩu '
        })
    }
    else
    {
       res.redirect('products')
    }
   }catch{
    res.render('login/FormDangnhap',
        {
            errorMessage:'sai định dạng '
        })
   }
})
module.exports=router