const doctorService = require('../services/appointmentService');
const appointmentService = require('../services/appointmentService');




const programedAppoitment = async (req, res) => {
    try {
        const { cui, date, hour } = req.body;

        // Convertir la fecha y obtener el día de la semana (0 = domingo, 6 = sábado)
        const dateObj = new Date(date);
        const dayOfWeek = dateObj.getUTCDay(); // Domingo = 0, Sábado = 6

        if (dayOfWeek === 0) {
            return res.status(400).json({ exito: false, message: 'El consultorio no atiende los domingos' });
        }

        // Convertir la hora a formato numérico para comparación
        const [hourPart] = hour.split(':').map(Number);
        if (hourPart < 7 || hourPart >= 19) {
            return res.status(400).json({ exito: false, message: 'El horario de atención es de 07:00 a 19:00' });
        }

        // Si la fecha y hora son válidas, se intenta programar la cita
        const result = await appointmentService.programAppointment(cui, date, hour);

        if (result.exito) {
            res.status(200).json(result);
        } else {
            res.status(400).json(result);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ exito: false, message: 'Error al programar la cita' });
    }
};

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



module.exports = {
    obtenerCitas,
   

    programedAppoitment,
    editAppointment,
    deleteAppointment,
    obtenerCitasporCUI,
    
 
};
