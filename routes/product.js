const express = require('express')
const router = express.Router();
const product = require('../module/product')
const partner = require('../module/Partner')
//Get all products route
router.get('/',async (req,res)=>
{
res.send("All products")
})
//New product route
router.get('/new',async(req,res)=>
{
    try
    {
     const partners = await partner.find({})
     const products = new product()
     res.render('products/new',{
        product: product,
        partners :partners,

     })
    }catch{
    res.redirect('/products')
    }
})
//Create product route
router.post('/',async(req,res)=>
{
    res.send("create book")
})
module.exports = router;
