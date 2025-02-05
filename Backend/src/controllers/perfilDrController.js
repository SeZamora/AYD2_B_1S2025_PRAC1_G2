const doctorService = require('../services/perfilDrService');

const obtenerPerfil = async (req, res) => {
    try {
        const perfil = await doctorService.obtenerPerfil(req.params.idDoctor);
        res.json(perfil);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

const actualizarPerfil = async (req, res) => {
    try {
        const perfilActualizado = await doctorService.actualizarPerfil(req.params.idDoctor, req.body);
        res.json(perfilActualizado);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
};

module.exports = {
    obtenerPerfil,
    actualizarPerfil
};
