const doctorService = require('../services/appointmentService');
const appointmentService = require('../services/appointmentService');

const obtenerCitas = async (req, res) => {
    try {
        const citas = await doctorService.obtenerCitas(req.params.idDoctor);
        res.json(citas);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

const obtenerCitasPendientes = async (req, res) => {
    try {
        
        // res.json({'hola': true})
        const citas = await doctorService.obtenerPendientes(req.params.idDoctor);
        res.json(citas);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

const atenderCita = async (req, res) => {
    try {
        const citaAtendida = await doctorService.atenderCita(req.params.idCita);
        res.json(citaAtendida);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
};

const cancelarCita = async (req, res) => {
    try {
        const { doctor, motivo, mensajeDisculpas } = req.body;

        const citaCancelada =  
            await doctorService.cancelarCita(req.params.idCita, doctor, motivo, mensajeDisculpas);
        res.json(citaCancelada);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
};


const getedAppoitmentPendingByPatient = async (req, res) => {
    try {
        const idPacient = req.params.idPacient;
        const appointment = await appointmentService.getAppointmentPendingByPatient(idPacient);
        res.json(appointment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las citas pendientes' });
    }
};


const programedAppoitment = async (req, res) => {
    try {
        const { idMedic, day, hour, date, reason, idPacient } = req.body;
        const result = await appointmentService.programAppoitment(idMedic, day, hour, date, reason, idPacient);
        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(400).json(result);
        }
    } catch (error) {
        console.error(error);
        res.json(500).json({ message: 'Error al programar la cita' })
    }
}

const obtenerHistorialCitas = async (req, res) => {
    try {
        const historial = await doctorService.obtenerHistorialCitas(req.params.idDoctor);
        res.json(historial);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

const cancelarCitaPaciente = async (req, res) => {
    try {
        const citaCancelada = await doctorService.cancelarCitaPaciente(req.params.idCita);
        res.json(citaCancelada);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
};

const getCitasHistorialByPaciente = async (req, res) => {
    try {
        const { idPaciente } = req.params;
        const result = await appointmentService.getCitasHistorialByPaciente(idPaciente);

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

module.exports = {
    obtenerCitas,
    obtenerCitasPendientes,
    atenderCita,
    cancelarCita,
    getedAppoitmentPendingByPatient,
    programedAppoitment,
    obtenerHistorialCitas,
    cancelarCitaPaciente,
    getCitasHistorialByPaciente
};
