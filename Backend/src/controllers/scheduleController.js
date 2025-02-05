const scheduleService = require('../services/scheduleService');

const getedScheduleByMedic = async (req, res) => {
    try {
        const idMedic = req.params.idMedic; 
        const schedule = await scheduleService.getScheduleByMedic(idMedic);
        res.json(schedule);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los horarios' });
    }
};

const getScheduleByDateAndMedic = async (req, res) => {
    try {
        const { idMedic, date } = req.params;
        console.log(`Recibida solicitud para médico ${idMedic} en la fecha ${date}`);
        
        const result = await scheduleService.getScheduleByDateAndMedic(idMedic, date);
        
        if (result.success) {
            res.status(200).json(result.schedule);
        } else {
            res.status(404).json({ message: result.message });
        }
    } catch (error) {
        console.error('Error al manejar la solicitud:', error);
        res.status(500).json({ message: 'Error al procesar la solicitud' });
    }
}

module.exports = {
    getedScheduleByMedic, 
    getScheduleByDateAndMedic
};