const User = require("../models/user");
const groupuser = require("../models/groupuser");





exports.addUser = (req, res, next) => {
  console.log("Inside add user controller")
  const groupid = req.params.id;
  //const name = req.body.name;
  const userId = req.body.userid
  console.log("Inside controller add user",userId)
  // if (name == undefined || name.length == 0) {
  //   return res.status(400).json({ message: "Paramaters missing" });
  // }
  User.findOne({ where: { id: userId } })
   .then((user) => {
    console.log("user Found",user)
    groupuser.create({
        isadmin: false,
        userId: user.id,
        groupId: groupid,
      });
      console.log("succesfully added user")
      res.status(201).json({ message: "User added to group", success: true });
    })
    .catch((err) =>
      res.status(500).json({ message: "Something went wrong", success: false })
    );
};








exports.removeUser = (req, res, next) => {
  const groupid = req.params.id;
  const userId = req.body.userid;
  groupuser
    .destroy({ where: { userId: userId, groupId: groupid } })
    .then((response) => {
      res.status(200).json({ message: "User Removed", success: true });
    })
    .catch((err) => {
      res.status(500).json({ message: "Something Went wrong", success: false });
    });
};















exports.makeAdmin = (req, res, next) => {
  const groupid = req.params.id;
  const userId = req.body.userid;
  console.log(groupid,userId,"Inside make admin")
  groupuser
    .update({ isadmin: true }, { where: { userId: userId, groupId: groupid } })
    .then((response) => {
      res.status(200).json({ message: "Successfull", success: true });
    })
    .catch((err) => {
      res.status(500).json({ message: "Something Went wrong", success: false });
    });
};
exports.removeAdmin = (req,res,next)=>{
  const groupid = req.params.id;
  const userId = req.body.userid;
  groupuser
    .update({ isadmin: false }, { where: { userId: userId, groupId: groupid } })
    .then((response) => {
      res.status(200).json({ message: "Successfull", success: true });
    })
    .catch((err) => {
      res.status(500).json({ message: "Something Went wrong", success: false });
    });
}