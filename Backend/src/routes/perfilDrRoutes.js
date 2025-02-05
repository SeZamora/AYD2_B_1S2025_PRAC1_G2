const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/perfilDrController');


router.get('/perfil/:idDoctor', doctorController.obtenerPerfil);
router.put('/perfil/:idDoctor', doctorController.actualizarPerfil);

module.exports = router;
