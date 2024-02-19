const express = require('express');
const router = express.Router();

const userController = require(`../controllers/user_controller`);

router.get('/profile', userController.profile);
router.get('/sign-up', userController.signUp);
router.get('/sign-in', userController.signIn);
router.get('/posts', userController.posts);
router.get('/sign-out', userController.signOut);
router.post('/create', userController.create);
router.post('/create-sessions', userController.createSessions);

// router.use('/posts',require('./posts'))

module.exports = router