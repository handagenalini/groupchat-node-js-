const Message = require("../models/message");

const User = require("../models/user");

const Group = require('../models/group')
const GroupUser= require('../models/groupuser')



exports.getgroupmembers = (req,res,next)=>{
  console.log("this.getgroupmembers")
    const groupid = req.params.id
    console.log("Inside controller get groupmembers")
    GroupUser.findAll({where:{groupid:groupid}
      , include: [
      {
        model: User,
        required: true,
      },
    ]
  })
    .then(response=>{

      //console.log("Inside response",response)
      res.status(200).json({data:response,success:true,myuser:req.user})
    })
    .catch(err=>res.status(500).json({message:'Something went wrong'}))
  }












exports.postchat = (req, res, next) => {
  let groupid = req.params.id
  console.log("Inside post chat")
  let message=req.body.message
  console.log(groupid,"group id")
  console.log(req.body,"Request body",message)
  if (message == undefined || message.length === 0) {
    return res.status(400).json({ err: "Parameters Missing" });
  } 
  else {
  Message.create({ message, userId: req.user.id,groupId:groupid})
    .then((result) => {
      res.status(201).json({ message: "Message Sent", success: true });
    })
    .catch((err) => {
      res.status(500).json({ err: "Something went wrong" });
    });
  }
};




exports.getchat = (req, res, next) => {
  let groupid = req.params.id
  Message.findAll({where:{groupId:groupid},
    include: [
      {
        model: User,
        required: true,
      },
    ],
    
  })
    .then((response) => {
      res.status(200).json({ data: response, success: true });
    })
    .catch((err) => {
      res.status(500).json({message:'Something Went Wrong',err})
    }
    );
};