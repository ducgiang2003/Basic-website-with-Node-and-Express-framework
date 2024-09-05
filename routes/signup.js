const express = require('express')
const router=express.Router()
const userModule = require('../module/accounts')
const validator = require('validator');

router.get('/', (req,res)=>
{
res.render('login/loginForm.ejs')
})
router.post('/',async(req,res)=>
{
    const { userName, password,name } = req.body;
    
        const existingAccount = await userModule.findOne({ userName });
        
    try
    { 
        if (existingAccount || !validator.isEmail(userName)) {
         res.render('login/loginForm.ejs',{
            errorMessage : "đã có tài khoản hoặc viết sai định dạng email "
         })
        }
        else
        {
        const newAccount = new userModule({ userName, password ,name });
    await newAccount.save();
    res.redirect('login')
          }  
        }
    catch(error)
    {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error' });
    }
})
module.exports = router