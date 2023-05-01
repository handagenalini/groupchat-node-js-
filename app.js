const express=require('express')
const app=express()

const cors=require('cors')
const bodyParser = require('body-parser'); 
const path=require('path')
const sequelize =require('./utils/database')                       // it gives 4 express middleware for parasing JSON, Text, URL-encoded, raw data sets over an HTTP request body... 
app.use(bodyParser.json({ extended: false}));
app.use(cors())
const dotenv = require('dotenv');

dotenv.config();


const routes=require('./routes/user');
const message=require('./routes/message');

const User=require('./model/user')
const Message=require('./model/message')


app.use(routes)
app.use(message)



User.hasMany(Message, {
    onDelete: "CASCADE",
  });
Message.belongsTo(User);






app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,`views/${req.url}`))
})

sequelize.sync().then(()=>{
    // console.log(result)
        app.listen(3000)
    }).catch(err=>{
        console.log(err)
    })
    