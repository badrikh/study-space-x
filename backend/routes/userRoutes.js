const express = require('express');
const router = express.Router();
<<<<<<< Updated upstream

const userController = require('../controller/userController');

=======
const userController = require('../controller/userController');

// Auth
router.post('/login', userController.loginUser);   // ✅
router.post('/signup', userController.signupUser); // ✅

>>>>>>> Stashed changes
// CRUD
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;