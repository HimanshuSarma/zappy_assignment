const express = require('express');
const router = express.Router();

const { rateLimiting } = require('../middleware/rate_limiting');
const auth = require('../middleware/authentication')

const LogController = require('../Controllers/Log.Controller');

//Get a list of all logs
router.get('/', rateLimiting({expiry: 15, maxRequests: 5}), LogController.getAllLogs);

//Create a new log
router.post('/create', (req, res, next) => {
    auth(req, res, next, 'admin');
}, LogController.createNewLog);

//Get a log by id
router.get('/:id', LogController.findLogById);

module.exports = router;
