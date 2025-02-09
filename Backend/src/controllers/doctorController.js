const doctorService = require('../services/doctorService');



const generarReceta = async (req, res) => {
    try {
        const { cuiPaciente, medicamentos } = req.body;

        if (!cuiPaciente || !medicamentos || medicamentos.length === 0) {
            return res.status(400).json({ message: 'Se requiere el CUI del paciente y al menos un medicamento' });
        }

        const { success, message } = await doctorService.generarReceta({ pacienteCui: cuiPaciente, medicamentos });

        if (!success) {
            return res.status(400).json({ message });
        }

        res.status(201).json({ success, message });

    } catch (error) {
        console.error('Error en generarReceta:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};



module.exports = {
    
    generarReceta
};
