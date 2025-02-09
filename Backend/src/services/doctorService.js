const pool = require('../database/connection');



const generarReceta = async ({ pacienteCui, medicamentos }) => {
    try {
        if (!medicamentos || medicamentos.length === 0) {
            return { success: false, message: 'Debe incluir al menos un medicamento en la receta' };
        }

        // Buscar el ID del paciente usando el CUI
        const queryPaciente = `
            SELECT id FROM paciente WHERE cui = ? LIMIT 1;
        `;
        const [paciente] = await pool.query(queryPaciente, [pacienteCui]);

        if (paciente.length === 0) {
            return { success: false, message: 'Paciente no encontrado' };
        }

        const pacienteId = paciente[0].id;

        // Buscar el ID del expediente del paciente
        const queryExpediente = `
            SELECT id FROM expediente WHERE paciente_id = ? LIMIT 1;
        `;
        const [expediente] = await pool.query(queryExpediente, [pacienteId]);

        if (expediente.length === 0) {
            return { success: false, message: 'Expediente no encontrado para este paciente' };
        }

        const expedienteId = expediente[0].id;

        // Insertar la receta en la base de datos
        const queryInsertReceta = `
            INSERT INTO recetas (expediente_id, medicamento, dosis, indicaciones, firma_digital)
            VALUES (?, ?, ?, ?, ?);
        `;

        for (const med of medicamentos) {
            const { nombre, dosis, indicaciones, firmaDigital } = med;

            if (!nombre || !dosis || !firmaDigital) {
                return { success: false, message: 'Faltan datos obligatorios en uno o más medicamentos' };
            }

            await pool.query(queryInsertReceta, [expedienteId, nombre, dosis, indicaciones || '', firmaDigital]);
        }

        return { success: true, message: 'Receta generada correctamente' };

    } catch (error) {
        console.error('Error al generar la receta:', error);
        return { success: false, message: 'Error interno del servidor' };
    }
};






module.exports = {
   
    generarReceta
};
