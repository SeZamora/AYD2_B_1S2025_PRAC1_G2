const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

router.post('/crearDoctor', doctorController.crearDoctor);
router.post('/iniciarSesion', doctorController.iniciarSesionDoctor);
router.put('/establecerHorario/:idDoctor', doctorController.establecerHorario);
router.put('/actualizarHorario/:idDoctor', doctorController.actualizarHorario);
router.get('/horario/:idDoctor', doctorController.obtenerHorario);
router.get('/specialty/:specialty', doctorController.getMedicsBySpecialty);
router.post('/generarReceta', doctorController.generarReceta);

module.exports = router;
