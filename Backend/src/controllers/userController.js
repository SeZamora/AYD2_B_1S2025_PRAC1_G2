const express = require('express');
const patientService = require('../services/patientService');

const getedMedics = async (req, res) => {

    try {
        const idPaciente = req.params.idPaciente; 
        const medics = await patientService.getDoctors(idPaciente);
        res.json(medics);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los médicos' });
    }
};




const createPatient = async (req, res) => {
    try {
        const usuario = await patientService.createPatient(req.body);
        res.status(201).json(usuario);
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "El usuario ya existe." });
    }
};

const getPatients = async (req, res) => {
    try {
        const pacientes = await patientService.getAllPatients();
        res.status(200).json({exito: true, pacientes});
    } catch (error) {
        console.error(error);
        res.status(500).json({ exito: false, message: "Error al obtener los pacientes." });
    }
};
const getPatient = async (req, res) => {
    try {
        const { idOrCui } = req.params; // Recibe el ID o CUI desde la URL
        const paciente = await patientService.getPatientIdOrCui(idOrCui);

        if (!paciente) {
            return res.status(404).json({ exito: false, message: "Paciente no encontrado." });
        }

        res.status(200).json({ exito: true, paciente });
    } catch (error) {
        console.error(error);
        res.status(500).json({ exito: false, message: "Error al obtener el paciente." });
    }
};


const deletePatient = async (req, res) => {
    try {
        const usuario = await patientService.deletePatient(req.body);
        res.status(201).json(usuario);
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "No se pudo eliminar el paciente" });
    }
};

const obtenerUsuario = async (req, res) => { 
    try {
        const {email, pass} = req.body
        const user = await patientService.obtenerUsuario(email,pass);
        res.json(user);
    } catch (error) {
        
        res.status(500).json({ error: error.message });
    }
}

const updateUserProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const result = await patientService.updateUserProfile(id, updatedData);
        
        if (result.success) {
            res.status(200).json({ message: result.message });
        } else {
            res.status(400).json({ message: result.message });
        }
    } catch (error) {
        console.error('Error al manejar la solicitud:', error);
        res.status(500).json({ message: 'Error al procesar la solicitud' });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await patientService.getUserById(id);

        if (result.success) {
            res.status(200).json(result.data);
        } else {
            res.status(404).json({ message: result.message });
        }
    } catch (error) {
        console.error('Error al manejar la solicitud:', error);
        res.status(500).json({ message: 'Error al procesar la solicitud' });
    }
};

const getExpediente = async (req, res) => {
    try {
        const { id_nombre } = req.params;

        const expediente = await patientService.getExpediente(id_nombre);

        res.json(expediente);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el expediente' });
    }
};

module.exports = {
    createPatient,
    getPatients,
    getPatient,
    obtenerUsuario,
    getedMedics,
    updateUserProfile,
    getUserById,
    deletePatient,
    getExpediente
};