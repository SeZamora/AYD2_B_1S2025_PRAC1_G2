const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/appointmentController');


router.get('/citas-pendientes/:idDoctor', doctorController.obtenerCitasPendientes);
router.put('/cita/atender/:idCita', doctorController.atenderCita);
router.put('/cita/cancelar/:idCita', doctorController.cancelarCita);
router.put('/cita/cancelarpaciente/:idCita', doctorController.cancelarCitaPaciente);

router.post('/appointment/programed', doctorController.programedAppoitment);
router.put('/appointment/edit', doctorController.editAppointment);
router.delete('/appointment/delete', doctorController.deleteAppointment);
router.get('/citas', doctorController.obtenerCitas);
router.post('/citasPaciente', doctorController.obtenerCitasporCUI);


router.get('/appitment/pending/:idPacient', doctorController.getedAppoitmentPendingByPatient);
router.get('/historialCitas/:idDoctor', doctorController.obtenerHistorialCitas);
router.get('/historial/:idPaciente', doctorController.getCitasHistorialByPaciente);

module.exports = router;
