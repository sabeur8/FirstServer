const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/allUsers', userController.getAllUsers)
router.get('/getUser/:id', userController.getUserById)
router.post('/addUsers', userController.createUser)
router.delete('/deleteUser/:id', userController.deleteUser)
router.put('/updateUser/:idU', userController.updateUser)

module.exports = router