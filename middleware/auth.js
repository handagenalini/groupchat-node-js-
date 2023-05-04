const jwt = require('jsonwebtoken')
const User = require('../models/user')

exports.authenticator = (req,res,next)=> {
try{
    console.log(req,"this is request Authorization")
    console.log(req.header,"This is inside heasder checking authenticator")
    const token = req.header('Authorization')
    console.log(token,"token in header authorization")
    const user = jwt.verify(token,'secretkey')
    console.log('User Id passing as req.user', user.userId)
    User.findByPk(user.userId)
    .then(user=>{
        req.user = user
        console.log(req.user.id)
        console.log(user,"Authorization user in middleware")
        next();
    })
}
    catch(err){
    console.log(err,"Middleware error in getting jwt token")
    return res.json({err,success:false})
    }
}