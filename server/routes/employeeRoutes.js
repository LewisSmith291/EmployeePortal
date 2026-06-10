const express = require('express');
const router = express.Router();
const { getEmployees } = require('../controllers/employeeController');

// When someone makes a GET request to this route, run the getEmployees function
router.get("/", getEmployees);

module.exports = router;
