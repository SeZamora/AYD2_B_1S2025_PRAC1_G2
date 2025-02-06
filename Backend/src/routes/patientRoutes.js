const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//Service for the main page
router.get('/medic/:idPacient', userController.getedMedics);
router.post('/createPatient', userController.createPatient); //usado
router.delete('/delete/', userController.deletePatient); //usado
router.post('/obtenerUsuario', userController.obtenerUsuario);
router.put('/update/:id', userController.updateUserProfile);
router.get('/userPacient/:id', userController.getUserById);
router.get('/expediente/:id_nombre', userController.getExpediente);//usado ayd2

module.exports = router;
