const express = require('express');
const router = express.Router();

const scheduleController = require('../controllers/scheduleController');

router.get('/schedule/:idMedic', scheduleController.getedScheduleByMedic);
router.get('/schedule/:idMedic/:date', scheduleController.getScheduleByDateAndMedic)

module.exports = router;