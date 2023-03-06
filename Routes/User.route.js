const express = require('express');
const router = express.Router();

const { rateLimiting } = require('../middleware/rate_limiting');

const UserController = require('../Controllers/User.Controller');

router.post(`/create`, UserController.userRegister);
router.post(`/login`, UserController.login);

module.exports = router;
