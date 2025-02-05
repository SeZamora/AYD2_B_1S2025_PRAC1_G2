const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/appointmentController');

router.get('/citas/:idDoctor', doctorController.obtenerCitas);
router.get('/citas-pendientes/:idDoctor', doctorController.obtenerCitasPendientes);
router.put('/cita/atender/:idCita', doctorController.atenderCita);
router.put('/cita/cancelar/:idCita', doctorController.cancelarCita);
router.put('/cita/cancelarpaciente/:idCita', doctorController.cancelarCitaPaciente);
router.post('/appoitment/programed', doctorController.programedAppoitment);
router.get('/appitment/pending/:idPacient', doctorController.getedAppoitmentPendingByPatient);
router.get('/historialCitas/:idDoctor', doctorController.obtenerHistorialCitas);
router.get('/historial/:idPaciente', doctorController.getCitasHistorialByPaciente);

module.exports = router;
