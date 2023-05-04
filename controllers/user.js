const User = require('../models/user')
const bcrypt = require('bcrypt')
const token = require('jsonwebtoken')

exports.signup = (req,res,next)=>{
    const {name,email,password} = req.body
    if(name == undefined || name.length === 0 
        || email == undefined || email.length === 0
        || password == undefined || password.length === 0)
        {
            return res.status(400).json({err:'Parameters Missing'})
        }
        User.findAll()
        .then(users=>{
            return bcrypt.hash(password, 10 )
        })
        .then(hash=>{
            return User.create({name,email,password:hash})
        })
        .then(user=>{
            res.status(201).json({message:'User Successfully Created'})
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({err:'Something Went wrong in outer catch'})
        })
}

function generateToken(id) {
    return token.sign({userId:id}, 'secretkey')
}

exports.signin=(req,res,next) =>{
    const{email,password} = req.body
    if(email == undefined || email.length === 0
        || password == undefined || password.length === 0)
        {
            return res.status(400).json({err:'Email Id or Password Missing',success:false})
        }
        User.findAll({where:{email:email}})
        .then(user=>{
            console.log("insie signin controller")
            if(user.length>0){
                bcrypt.compare(password, user[0].password, (err,result)=>{
                    if(err) {
                        return res.status(400).json({message:'Something went wrong'})
                    }
                    if(result === true){
                        
                        return res.status(200).json({message:'Successfully logged in', success:true, token:generateToken(user[0].id)})
                    } else {
                        return res.status(400).json({message: 'Password did not match', success:false})
                    }
                })
               
            } else {
                return res.status(404).json({message:'User does not exist'})
            }
        })
        .catch(err=>{
            res.status(500).json({message:err, success:false})
        })
}