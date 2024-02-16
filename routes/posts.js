const express = require('express');
const router = express.Router();

console.log("entered")

const postsController = require(`../controllers/posts_controller`);

router.get(`/`, postsController.posts)

module.exports = router;