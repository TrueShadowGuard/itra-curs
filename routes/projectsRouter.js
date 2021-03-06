const Router = require('express')
const router = new Router()
const controller = require('../controllers/projectsController')
const {check} = require("express-validator")
const authMiddleware = require('../middlewaree/authMiddleware')

router.get('/getProject/:id', controller.getProject)
router.get('/getProjects', controller.getProjects)

router.post('/send-money/:id', authMiddleware, controller.sendMoney)

router.post('/send-message/:id', authMiddleware, controller.sendMessage)
router.get('/get-messages/:id', controller.getComments)

router.delete('/delete-project', authMiddleware, controller.deleteProject)

module.exports = router
