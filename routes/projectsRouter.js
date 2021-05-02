const Router = require('express')
const router = new Router()
const controller = require('../controllers/projectsController')
const {check} = require("express-validator")
const authMiddleware = require('../middlewaree/authMiddleware')

router.get('/getProjects', controller.getProjects)
router.get('/getProject/:id', controller.getProject)


module.exports = router
