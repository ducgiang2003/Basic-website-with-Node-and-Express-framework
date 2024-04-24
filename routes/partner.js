const express = require('express')
const router = express.Router();
//Declare module
const partnerModule= require('../module/Partner')
//All partner route
router.get('/',async(req,res)=>
{
    //Need to search options , 
    //If we find one partner , it will show only that partner and their information on screen 
    let searchOptions = {}
    //Use query instead body because it give request send information through the query , case in point the url have name=Gi in tail
    //name=Gi , this is a query and it doesn't depend DB
    //That means it depend variable in view folder
    //And use body if you want to send  request post 
    if(req.query.name!=null && req.query.name!=='')
    {
        searchOptions.name= new RegExp(req.query.name,'i')
    }
    try
    {
     const partners = await partnerModule.find(searchOptions)
     res.render('partners/index',{
        partners:partners,
        searchOptions:req.query})
    }catch
    {
     res.redirect('/')
    }

})
//New partner route
router.get('/new',(req,res)=>
{
    res.render('partners/new',{partner:new partnerModule()})
})
router.post('/',async(req,res)=>
{
   
    //This function will upload data to DB 
   const partner = new partnerModule({
    name :req.body.partner_name,
    country:req.body.partner_country,
   })
   //Must async(asynchonous(Dong bo)) 
   //Wrap code in try-catch block , if have an error it'll redirect another page like partners/new

   try
   {
   //Try to wait partner save and it will save then it will populate in newPartner
   //In short , wait partner save and it will populate in newPartner const
  const newPartner = await partner.save()
  {
    //with url have partner id 
    res.redirect(`partners/${newPartner.id}`)
  
  }
   }catch
   {
    res.render('partners/new',{
      partner : partner,
      errorMessage:'Error to make a new partner'
    })
   }

//    newPartner.save().then(()=>
//    {
//     // res.redirect(`partners/${partner.id}`)
//     res.redirect(`partners`)
//    }).catch(err)
//    {
//     res.sender('partners/new',
//     {
//         partner : newPartner,
//         errorMessage:'error'
//     })
//    }
})
//id will passed on along with the request with the colon before
//id in here is id with every single partner 
router.get('/:id',async (req,res)=>
{
  try{
  res.redirect('/partners')
  }
  catch{
    res.redirect('/partners')
  }
})
router.get('/:id/edit',async (req,res)=>
{
  try
  {
    //Find id every single partner in mongo db
    const partner = await partnerModule.findById(req.params.id)
  res.render('partners/edit',{partner:partner})
  }catch
  {
    res.redirect('/partners')
  }
})

router.put('/:id', async (req,res)=>
{
  let partner
  try {
    partner = await partnerModule.findById(req.params.id)
    partner.name = req.body.partner_name
    partner.country = req.body.partner_country
    await partner.save()
    res.redirect(`/partners/${partner.id}`)
  } catch {
    if(partner==null)
    {
      res.redirect('/')
    }else{
    
    
      res.render('partners/edit', {
        partner: partner,
        errorMessage: 'Error updating Partner'
      })
    }
  }
  
})


router.delete('/:id',async (req,res)=>
{
    //Just delete instead save and need a delete function (use pre(remove) method)
    //And dont need get req.body in view class 
  let partner
  try {
    partner = await partnerModule.findById(req.params.id)
    await partner.deleteOne()
    res.redirect(`/partners/${partner.id}`)
  } catch {
    if(partner==null)
    {
      res.redirect('/')
    }else{
    
    //And after delete it, it will return to partners page 
     res.redirect(`/partners/${partner.id}`)
    }
  }
})
//Create partner route

module.exports=router;