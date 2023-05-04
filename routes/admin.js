const Express = require('express')

const router = Express.Router()

const adminController = require('../controllers/admin')
const authenticator = require('../middleware/auth')


router.post('/adduser/:id',authenticator.authenticator,adminController.addUser)

router.post('/removeuser/:id',authenticator.authenticator,adminController.removeUser)

router.post('/makeadmin/:id',authenticator.authenticator,adminController.makeAdmin)

router.post('/removeadmin/:id',authenticator.authenticator,adminController.removeAdmin)

module.exports = router