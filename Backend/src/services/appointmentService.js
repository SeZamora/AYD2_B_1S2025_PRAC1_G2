
const pool2 = require('../database/connection');
const nodemailer = require('nodemailer');




// Programar cita ayd2
const programAppointment = async (cui, date, hour) => {
    
    const connection = await pool2.getConnection();
    try {
        await connection.beginTransaction();

        const verifyPatientQuery = `SELECT id FROM paciente WHERE cui = ?`;
        
        const [patient] = await connection.execute(verifyPatientQuery, [cui]);

        
        if (patient.length === 0) {
            await connection.rollback();          

            return { exito: false, message: 'El paciente no está registrado en el sistema.' };
        }
        
        
        const idPatient = patient[0].id; 
        console.log('Programando cita para:', cui, date, hour,patient[0].id);

        const verifyAppointmentQuery = `
            SELECT * FROM citas 
            WHERE paciente_id = ? AND fecha = ? AND hora = ?;
        `;
       
        const [existingAppointment] = await connection.execute(verifyAppointmentQuery, [idPatient, date, hour]);
        
        if (existingAppointment.length > 0) {
            await connection.rollback();
            return { exito: false, message: 'El paciente ya tiene una cita programada en ese horario.' };
        }

       
        const insertAppointmentQuery = `
            INSERT INTO citas (fecha, hora, estado, paciente_id) 
            VALUES (?, ?, 'Pendiente', ?);
        `;
        
        await connection.execute(insertAppointmentQuery, [date, hour, idPatient]);

        await connection.commit();

        return { exito: true, message: 'Cita programada correctamente.', date, hour };
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};

const editarCita = async (idCita, fecha, hora, estado) => {
    const query = `
        UPDATE citas 
        SET fecha = ?, hora = ?, estado = ? 
        WHERE id = ?
    `;

    try {
        const [result] = await pool2.query(query, [fecha, hora, estado, idCita]);

        if (result.affectedRows === 0) {
            return { exito: false, message: "ERROR: Cita no encontrada." };
        }

        return { exito: true, message: "Cita actualizada satisfactoriamente" };
    } catch (error) {
        console.error("ERROR: no fue posible actualizar la cita.", error);
        return { exito: false, message: "ERROR: no fue posible actualizar la cita." };
    }
};

const eliminarCita = async (idCita) => {
    console
    const query = `
        DELETE FROM citas 
        WHERE id = ?
    `;

    try {
        const [result] = await pool2.query(query, [idCita]);

        if (result.affectedRows === 0) {
            return { exito: false, message: "ERROR: Cita no encontrada." };
        }

        return { exito: true, message: "Cita eliminada exitosamente." };
    } catch (error) {
        console.error("Error al eliminar la cita:", error);
        return { exito: false, message: "Error al eliminar la cita." };
    }
};
const obtenerCitas = async () => {
    const query = `
       SELECT c.*, CONCAT(p.nombre, ' ', p.apellido) AS nombre_paciente, p.cui
        FROM ayd2_practica1.citas c
        JOIN ayd2_practica1.paciente p ON c.paciente_id = p.id
    `;

    try {
        const [rows] = await pool2.query(query);
        return rows;
    } catch (error) {
        console.error("Error al obtener todas las citas:", error);
        return [];
    }
};

const obtenerCitaPorCui = async (cui) => {
   
    const query = `
        SELECT c.*, CONCAT(p.nombre, ' ', p.apellido) AS nombre_paciente, p.cui
        FROM ayd2_practica1.citas c
        JOIN ayd2_practica1.paciente p ON c.paciente_id = p.id
        WHERE p.cui = ?;
    `;

    try {
        const [rows] = await pool2.query(query, [cui]);
        return rows;
    } catch (error) {
        console.error("Error al obtener citas por CUI:", error);
        return [];
    }
};





module.exports = {
    obtenerCitas,
    programAppointment,
    editarCita,
    eliminarCita,
    obtenerCitaPorCui,
};
