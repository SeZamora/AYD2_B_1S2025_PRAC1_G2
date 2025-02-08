const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/appointmentController');



router.post('/appointment/programed', doctorController.programedAppoitment);
router.put('/appointment/edit', doctorController.editAppointment);
router.delete('/appointment/delete', doctorController.deleteAppointment);
router.get('/citas', doctorController.obtenerCitas);
router.post('/citasPaciente', doctorController.obtenerCitasporCUI);



module.exports = router;
