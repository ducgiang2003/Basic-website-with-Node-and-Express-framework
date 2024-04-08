if(process.env.NODE_ENV !== 'production')
{
   require('dotenv').config();
}

const express = require('express');
const app=express();
const expressLayouts = require('express-ejs-layouts')
const bodyparser = require('body-parser')
//Declare routers
const Indexrouter = require('./routes/index')
const Partnerrouter = require('./routes/partner')
const productRouter = require('./routes/product')


const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//Setup view and layout
app.set('view engine','ejs')
app.set('views',__dirname + '/views')
app.set('layout','layouts/layout')
//Express use
app.use(expressLayouts)
//Get static file from public folder like img or ...
app.use(express.static('public'))
//Set up bodyparser
//Sending file with max value 16 mb and  and found it in bodyparser lib 
app.use(bodyparser.urlencoded({limit:'16mb',extended:false}))

//Mongo connection  deploys somewhere web sever except in this computer
//For that , we need env variables and a string , process url 
//But before that we need to use library call dotenv to load env variable into our application 

mongoose.connect( process.env.DATABASE_URL,)

//Connect to db
const db = mongoose.connection
//If db error ,it will print on console
db.on('error',error=>console.log(error))

//Just open once time and
db.once('open',()=> console.log("Connect to database sucess"))

//Get link with router
app.use('/',Indexrouter)
app.use('/partners',Partnerrouter)
app.use('/products',productRouter)

app.listen(process.env.PORT||4000)