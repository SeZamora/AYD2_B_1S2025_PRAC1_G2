const doctorService = require('../services/doctorService');

const crearDoctor = async (req, res) => {
    try {
        const doctor = await doctorService.crearDoctor(req.body);
        res.status(201).json(doctor);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
};

const iniciarSesionDoctor = async (req, res) => {
    try {
        const doctor = await doctorService.iniciarSesionDoctor(req.body.email, req.body.pass);
        res.json(doctor);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
};

const establecerHorario = async (req, res) => {
    try {
        const horarioEstablecido = await doctorService.establecerHorario(req.params.idDoctor, req.body);
        res.json(horarioEstablecido);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
};

const actualizarHorario = async (req, res) => {
    try {
        const { hora_inicio, hora_fin, horarios } = req.body;
        const horarioActualizado = await doctorService.actualizarHorario(
            req.params.idDoctor, horarios, hora_inicio, hora_fin);
        res.json(horarioActualizado);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
};

const obtenerHorario = async (req, res) => {
    try {
        const horarioActualizado = await doctorService.obtenerHorario(
            req.params.idDoctor);
        res.json(horarioActualizado);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
};

const getMedicsBySpecialty = async (req, res) => {
    try {
        const { specialty } = req.params;
        console.log(`Buscando médicos con la especialidad ${specialty}`);
        
        const result = await doctorService.getMedicsBySpecialty(specialty);
        if (result.success) {
            res.status(200).json(result.data);
        } else {
            res.status(500).json({ message: result.message });
        }
    } catch (error) {
        console.error('Error al manejar la solicitud:', error);
        res.status(500).json({ message: 'Error al procesar la solicitud' });
    }
}

module.exports = {
    crearDoctor,
    iniciarSesionDoctor,
    establecerHorario,
    actualizarHorario,
    obtenerHorario,
    getMedicsBySpecialty
};
