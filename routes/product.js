const express = require('express')
const router = express.Router();
const path = require('path')
//Import module class
const productModule = require('../module/product')
const partner = require('../module/Partner')
//Multer is middleware help handle easily data multiform in view class
const multer = require('multer')
//Fie system lib
const fs = require('fs');
const { error } = require('console');
//Path to upload image
const uploadPath = path.join('public',productModule.converImageBasePath)
//Define image type 
const imageMinesType = ['image/jpeg','image/png','image/gif']



//Upload image
const upload =multer({
    // DEST parameter to specify a destination for a sysout data set
  dest:uploadPath,
  //File filter 
  fileFilter: (req,file,callback) => {
     callback(null,imageMinesType.includes(file.mimetype));
  }
})

//Get all products route
router.get('/',async (req,res)=>
{
  let query = productModule.find()
  if (req.query.title != null && req.query.title != '') {
    query = query.regex('title', new RegExp(req.query.title, 'i'))
  }
  if (req.query.publishedBefore != null && req.query.publishedBefore != '') {
    query = query.lte('publishDate', req.query.publishedBefore)
  }
  if (req.query.publishedAfter != null && req.query.publishedAfter != '') {
    query = query.gte('publishDate', req.query.publishedAfter)
  }
  try {
    const products = await query.exec()
    res.render('products/index', {
      products: products,
      searchOptions: req.query
    })
  } catch {
    res.redirect('/')
  }
})
//New product route
router.get('/new',async(req,res)=>
{
   newRenderPage(res,new productModule())
})
//Create product route
router.post('/',upload.single('cover'),async(req,res)=>
{
    //Get file name (image) ,check  req data file  is ! null or file name : null

    const fileName =  req.file!=null ? req.file.filename:null

    //Structure of product 
    const product = new productModule({
        title:req.body.title,
        partner:req.body.partner,
        publishDate:new Date(req.body.publishDate),
        productCount:req.body.productCount,
        //Get string image name type
        coverImageName:fileName,
        description:req.body.description,

    })
    //Save new product 
    try
    {
      const newProduct = await product.save()
    //   res.redirect(`products/${newProduct.id}`)
      res.redirect(`products`)
    }catch
    {
      // Remove product cover 
      if(product.coverImageName!=null)
      {
        //Remove product from screen not in the db 
        //Function coverImageName will return imageName String =fileName
      RemoveProductCover(product.coverImageName)
    }
      newRenderPage(res,product,true)
    }

})
function RemoveProductCover(fileName)
{
  //Remove the file by using unlink and path in folder (path.join) and if has error, it will show error
//
  fs.unlink(path.join(uploadPath,fileName),err=>
{
  if(err)
  console.error(err)
})
}
async function newRenderPage(res,product,hasError =false){
    //Show all partner 
    try
    {
     const partners = await partner.find({})
     //Usually do 
          const para = {
            partners:partners,
            product:product
          }
          //Have error
          if(hasError) para.errorMessage='Error Creating Product'
          
        
        res.render('products/new',para)

     //Often do 
    //   res.render('products/new'{
    //     partners:partners,
    //     product:product
    //   })
    }
    catch{
      res.redirect('/products')
    }
}
module.exports = router;
