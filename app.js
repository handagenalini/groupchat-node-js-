const path = require('path');
const cors=require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
const sequelize = require('./utills/database');

const app = express();
app.use(cors())

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));



//Models
const User = require('./models/user');
const Message = require('./models/message')
const Group = require("./models/group");
const Groupuser = require("./models/groupuser");


//Routes
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const groupRoutes = require("./routes/group");
const groupuserRoute = require('./routes/groupuser')





app.use(userRoutes)
app.use(adminRoutes)
app.use(groupRoutes)
app.use(groupuserRoute)
app.use(adminRoutes)
app.use(errorController.get404);


//Relationships
User.hasMany(Message);
User.hasMany(Group);
Group.hasMany(Message);
Group.hasMany(Groupuser);
Groupuser.belongsTo(User);
Groupuser.belongsTo(Group)
Message.belongsTo(User);
Message.belongsTo(Group);







sequelize
  //.sync({ force: true })
  .sync()
  .then(result => {
    app.listen(3000)
    //console.log(result);
  })
  .catch(err => {
    console.log(err);
  });