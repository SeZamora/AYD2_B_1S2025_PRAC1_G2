const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');


router.post('/generarReceta', doctorController.generarReceta);

module.exports = router;
