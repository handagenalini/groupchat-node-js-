const Express = require('express')

const router = Express.Router()

const groupuserController = require('../controllers/groupuser')
const authenticator = require('../middleware/auth')

router.get('/getgroupmembers/:id',authenticator.authenticator,groupuserController.getgroupmembers)

router.get('/getmessage/:id',authenticator.authenticator, groupuserController.getchat);

router.post('/postmessage/:id',authenticator.authenticator,groupuserController.postchat);



module.exports = router