const express = require('express');
const router = express.Router();
const passport = require('passport')

const userController = require(`../controllers/user_controller`);

router.get('/profile', passport.checkAuthentication, userController.profile);
router.get('/sign-up', userController.signUp);
router.get('/sign-in', userController.signIn);
router.get('/sign-out', userController.signOut);
router.get('/posts', userController.posts);
router.post('/create', userController.create);
router.post('/create-sessions',passport.authenticate(
    'local',
    {failureRedirect : '/user/sign-in'}
),userController.createSession);
// router.use('/posts',require('./posts'))

module.exports = router