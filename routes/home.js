const express = require('express')
const router = express.Router()
const sneaker = require('../module/sneaker')

router.get('/', (req,res)=>
    
{
    res.render('home/home.ejs')
})
router.post('/',(req,res)=>
{
    res.redirect('complain')
})
router.get('/cart',(req,res)=>
{
res.render('cart/Giohang.ejs')
})
router.post('/cart',async(req,res)=>
{
    const gia = req.body.giaCa
    const soLuong=req.body.soLuong
   const tongGia = gia*soLuong
   const sneakers = new sneaker({
      name:req.body.mauGiay,
      size:req.body.sizeGiay,
      price:tongGia,
      number:req.body.soLuong
})
    try{
   const newSneaker = await sneakers.save()
   // Lấy tất cả sneakers từ cơ sở dữ liệu
const allSneakers = await sneaker.find();

    res.render('cart/formGiohang',{
        sneakers:allSneakers,
        errorMessage:'error'
    })
    }
    catch(error)
    {
        res.send(error)
    }
    });
    router.get('/cart/:id',async (req,res)=>
    {
      try
      {
      const sneakerr =await sneaker.findById(req.params.id)
      res.render('cart/viewForm',
    {
      sneakers:sneakerr,
    })
      }catch
      {
        res.send("loi he thong")
      }
    })
router.get('/cart/:id/edit',async(req,res)=>
{
try
{
    const sneakera = await sneaker.findById(req.params.id)
    res.render('cart/edit',{sneakers:sneakera})

}
catch
{
   res.redirect('/home/cart')
}
})
router.put('/cart/:id',async(req,res)=>
{
    let sneakerss
    try
    {
        sneakerss = await sneaker.findById(req.params.id)
        sneakerss.name=req.body.mauGiay
        sneakerss.number = req.body.soLuong
        sneakerss.price = req.body.giaCa
        sneakerss.size = req.body.sizeGiay
        await sneakerss.save()
     res.send("Cap nhat thanh cong")
    }catch
    {
       if(sneakerss==null)
    {
      res.redirect('/home/cart')
    }
    else
    {
      res.render('cart/edit',{
        sneakers:sneakerss,
        errorMessage:"Error"
      })
    }
  }
})
router.delete('/cart/:id', async(req,res)=>
{
  let sneakerss
  try
  {
    sneakerss =await sneaker.findById(req.params.id)
    await sneakerss.deleteOne()
    res.send("xoa thanh cong")
  }
  catch
  {
    if(sneakerss==null)
    {
      res.redirect('/home/cart')
    }
    else
    {
      res.send('Loi he thong')
    }
  }
})
module.exports=router