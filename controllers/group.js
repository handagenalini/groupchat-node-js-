const User = require("../models/user");
const Group = require('../models/group')
const groupuser = require('../models/groupuser')



exports.fetchgroup = (req,res,next)=>{
  console.log(req.user.id,"this is logged user id")
  groupuser.findAll({where:{userId:req.user.id}
  //   , include: [
  //   {
  //     model: Group,
  //     required: false,
  //   },
  // ],
  })
  .then(response=>{
    console.log("inside fetch group controller")
    res.status(200).json({data:response,success:true})
  })
  .catch(err=>{
    res.status(500).json({message:'something went wrong',err})
  })
}



exports.createGroup = (req,res,next)=>{
    const {name} = req.body
    if (name == undefined || name.length === 0) {
        return res.status(400).json({ err: "Parameters Missing" });
      } else {
        console.log(req.user)
        //let user = req.user
        // user.createGroup({name:name})
        Group.create({name:name})
        .then(group=>{
          groupuser.create({isadmin:true,userId:req.user.id,groupId:group.id})
          .then(response=>{
              res.status(201).json({message:'Group Created',success:true})
          })
           })
      .catch(err=>{
          res.status(500).json({message:'Something went wrong',err})
      })
      }
}

