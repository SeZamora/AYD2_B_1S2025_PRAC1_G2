const doctorService = require('../services/appointmentService');
const appointmentService = require('../services/appointmentService');



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
        const { cui, date , hour } = req.body;
        const result = await appointmentService.programAppointment(cui, date, hour);
        if (result.exito) {
            res.status(200).json(result);
        } else {
            res.status(400).json(result);
        }
    } catch (error) {
        console.error(error);
        res.json(500).json({ message: 'Error al programar la cita' })
    }
}

const editAppointment = async (req, res) => {
    try {
        const { idCita, date, hour, state } = req.body;
        const result = await appointmentService.editarCita(idCita, date, hour, state);
        if (result.exito) {
            res.status(200).json(result);
        } else {
            res.status(400).json(result);
        }
    } catch (error) {
        console.error(error);
        res.json(500).json({ message: 'Error al editar la cita' })
    }
}
const deleteAppointment = async (req, res) => {
    try {
        const { idCita } = req.body;
        const result = await appointmentService.eliminarCita(idCita);
        if (result.exito) {
            res.status(200).json(result);
        } else {
            res.status(400).json(result);
        }
    } catch (error) {
        console.error(error);
        res.json(500).json({ message: 'Error al editar la cita' })
    }
}
const obtenerCitas = async (req, res) => {
    try {
        const citas = await doctorService.obtenerCitas();
        res.json(citas);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

const obtenerCitasporCUI = async (req, res) => {
    try {
        const { cui } = req.body;
        const citas = await doctorService.obtenerCitaPorCui(cui);
        res.json(citas);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

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
    editAppointment,
    deleteAppointment,
    obtenerCitasporCUI,
    
    obtenerHistorialCitas,
    cancelarCitaPaciente,
    getCitasHistorialByPaciente
};
