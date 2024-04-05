if(process.env.NODE_ENV !== 'production')
{
   require('dotenv').config();
}

const express = require('express');
const app=express();
const expressLayouts = require('express-ejs-layouts')
const Indexrouter = require('./routes/index')
const mongoose = require('mongoose')
//Setup view and layout
app.set('view engine','ejs')
app.set('views',__dirname + '/views')
app.set('layout','layouts/layout')
//Express use
app.use(expressLayouts)
//Get static file from public folder like img or ...
app.use(express.static('public'))

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

//Get index view with router
app.use('/',Indexrouter)

app.listen(process.env.PORT||3000)