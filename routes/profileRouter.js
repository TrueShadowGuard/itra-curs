const Router = require('express')
const router = new Router()
const controller = require('../controllers/profileController')
const authMiddleware = require('../middlewaree/authMiddleware')

router.get('/:id', controller.getProfile)
router.post('/create-project', authMiddleware, controller.createProject)

module.exports = router
