const Express = require('express')

const router = Express.Router()

const groupController = require('../controllers/group')

const authenticator = require('../middleware/auth')

router.post('/creategroup',authenticator.authenticator,groupController.createGroup)
router.get('/getgroups',authenticator.authenticator,groupController.fetchgroup)

module.exports=router