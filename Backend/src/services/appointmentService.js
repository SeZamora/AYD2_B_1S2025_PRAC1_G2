const pool = require('../database/database');
const pool2 = require('../database/connection');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', // O el servicio que uses
    auth: {
        user: 'testsancarlos123@gmail.com',
        pass: 'acca ekbl atmk wxfh'
    }
});


// Programar cita ayd2
const programAppointment = async (cui, date, hour) => {
    const connection = await pool2.getConnection();
    try {
        await connection.beginTransaction();

        // Verificar si el paciente está registrado en la base de datos
        const verifyPatientQuery = `SELECT id FROM paciente WHERE cui = ?`;
        const [patient] = await connection.execute(verifyPatientQuery, [cui]);

        if (patient.length === 0) {
            await connection.rollback();
            return { exito: false, message: 'El paciente no está registrado en el sistema.' };
        }

        const idPatient = patient[0].id; 
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
        const [result] = await pool.query(query, [fecha, hora, estado, idCita]);

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
    const query = `
        DELETE FROM citas 
        WHERE id = ?
    `;

    try {
        const [result] = await pool.query(query, [idCita]);

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
        const [rows] = await pool.query(query);
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
        const [rows] = await pool.query(query, [cui]);
        return rows;
    } catch (error) {
        console.error("Error al obtener citas por CUI:", error);
        return [];
    }
};




const obtenerPendientes = async (idDoctor) => {
    const query = `
        SELECT c.*, CONCAT(p.nombre, ' ', p.apellido) AS nombre_paciente
        FROM citas c
        JOIN usuarios p ON c.id_paciente = p.id_usuario
        WHERE c.id_medico = ? AND c.estado = \'pendiente\'
    `
    const [rows] = await pool.query(query, [idDoctor]);
    return rows;
};

const atenderCita = async (idCita) => {
    const [result] = await pool.query(
        'UPDATE citas SET estado = "atendido" WHERE id_cita = ?',
        [idCita]
    );
    if (result.affectedRows === 0) {
        throw new Error('No se encontró la cita o no se pudo actualizar');
    }
    return { id_cita: idCita, estado: 'atendida' };
};

const cancelarCita = async (idCita, doctor, motivo, mensajeDisculpas) => {
    const connection = await pool.getConnection();
    
    
    try {
        await connection.beginTransaction();

        const [result] = await connection.query(
            'UPDATE citas SET estado = "cancelado_medico" WHERE id_cita = ?',
            [idCita]
        );

        if (result.affectedRows === 0) {
            await connection.rollback();
            throw new Error('No se encontró la cita o no se pudo actualizar');
        }

        const [rows] = await connection.query(
            `SELECT p.email, p.nombre, p.apellido, c.fecha, c.hora 
            FROM citas c
            JOIN usuarios p ON c.id_paciente = p.id_usuario
            WHERE c.id_cita = ?`,
            [idCita]
        );

        if (rows.length === 0) {
            await connection.rollback();
            throw new Error('No se encontró el paciente para la cita');
        }

        const paciente = rows[0];

        const mailOptions = {
            from: 'testsancarlos123@gmail.com',
            to: paciente.email,
            subject: 'Cita cancelada',
            text: `Hola ${paciente.nombre} ${paciente.apellido},
                \n\nSu cita programada para el ${paciente.fecha} a las 
                ${paciente.hora} ha sido cancelada por el médico.
                \nMotivo:${motivo}
                \Mensaje de disculpas:${mensajeDisculpas}
                \n\nSaludos,\n
                Att: Dr ${doctor}
                Tu Clínica`
        };

        await transporter.sendMail(mailOptions);

        await connection.commit();
        return { id_cita: idCita, estado: 'cancelada' };
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};


const cancelarCitaPaciente = async (idCita) => {
    const [result] = await pool.query(
        'UPDATE citas SET estado = "cancelado_paciente" WHERE id_cita = ?',
        [idCita]
    );
    if (result.affectedRows === 0) {
        throw new Error('No se encontró la cita o no se pudo actualizar');
    }
    return { id_cita: idCita, estado: 'cancelada' };
};

const getAppointmentPendingByPatient = async (idPatient) => {
    const query = `
    SELECT c.id_cita, c.fecha, c.hora, u.nombre, u.apellido, u.direccion AS direccion_clinica, c.motivo 
    FROM citas c
    JOIN usuarios u ON c.id_medico = u.id_usuario
    WHERE c.id_paciente = ? AND c.estado = 'pendiente'; `;
    const [rows] = await pool2.query(query, [idPatient]);
    return rows;
};



const obtenerHistorialCitas = async (idDoctor) => {
    const [rows] = await pool.query(`
        SELECT c.fecha, c.hora, p.nombre, c.estado
        FROM citas c
        JOIN usuarios p ON c.id_paciente = p.id_usuario
        WHERE c.id_medico = ? AND (c.estado = 'atendido' OR c.estado = 'cancelado_medico' OR c.estado = 'cancelado_paciente');`, [idDoctor]);
    return rows;
};

const getCitasHistorialByPaciente = async (idPaciente) => {
    try {
        const query = `
            SELECT c.id_cita, c.fecha, u.nombre, u.apellido, c.motivo, c.estado 
            FROM citas c
            JOIN usuarios u ON c.id_medico = u.id_usuario
            WHERE c.id_paciente = ? AND c.estado IN ('atendido', 'cancelado_paciente', 'cancelado_medico');
        `;
        const [results] = await pool.query(query, [idPaciente]);

        if (results.length === 0) {
            return { exito: false, message: 'No se encontraron citas para el paciente.' };
        }

        return { exito: true, data: results };
    } catch (error) {
        console.error('Error al obtener el historial de citas:', error);
        return { exito: false, message: 'Error al obtener el historial de citas' };
    }
};



module.exports = {
    obtenerCitas,
    obtenerPendientes,
    atenderCita,
    
    cancelarCita,
    getAppointmentPendingByPatient,

    programAppointment,
    editarCita,
    eliminarCita,
    obtenerCitaPorCui,

    obtenerHistorialCitas,
    cancelarCitaPaciente,
    transporter,
    getCitasHistorialByPaciente
};
