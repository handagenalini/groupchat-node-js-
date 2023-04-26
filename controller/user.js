

const bcrypt=require('bcrypt')

const User=require('../model/user')
const jwt=require('jsonwebtoken')

exports.postsignup=async(req,res,next)=>{
    console.log("-------------------------1signup")

    try{
     if(!req.body.email){
        throw new Error('please enter email')
     }
     const email=req.body.email
     const name=req.body.name
     const phonenumber=req.body.phonenumber
 
    const password=req.body.password

    //  User.findAll({ where : { email }}).then(user => {
    //     if(user.length>0){
    //       return  res.status(506).json({err:'user already exist'})
    //     }
    //  })
    const saltrounds=10
    bcrypt.hash(password,saltrounds,async(err,hash)=>{
   
    const user=await User.create({
        name:name,email:email,phonenumber:phonenumber, password:hash
    })
    return res.status(201).json({message:'user created successfully',user:user})
})
    }catch(err){
        console.log(err)
        return res.status(500).json({error:err})                    
    }
}