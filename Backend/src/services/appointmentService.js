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

const obtenerCitas = async (idDoctor) => {
    const [rows] = await pool.query('SELECT * FROM citas WHERE id_medico = ? AND estado = "pendiente"', [idDoctor]);
    return rows;
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


const programAppoitment = async (idMedic, day, hour, date, reason, idPatient) => {
    const connection = await pool2.getConnection();
    try {
        await connection.beginTransaction();

        const verifyDisponibilityMedicQuery = `
      SELECT * FROM horarios h 
      WHERE h.id_medico = ? AND h.dia = ? AND ? BETWEEN h.hora_inicio AND h.hora_fin;
    `;
        const [disponibility] = await connection.execute(verifyDisponibilityMedicQuery, [idMedic, day, hour]);
        if (disponibility.length === 0) {
            await connection.rollback();
            return { success: false, message: 'El médico no tiene disponibilidad en ese horario' };
        }

        const verifyAppointmentQuery = `
     SELECT * FROM citas c 
      WHERE c.id_medico = ? AND c.fecha = ? AND c.hora = ?;
    `;
        const [existApoitment] = await connection.execute(verifyAppointmentQuery, [idMedic, date, hour]);

        if (existApoitment.length > 0) {
            await connection.rollback();
            return { success: false, message: 'El médico ya tiene una cita programada en esa hora.' };
        }

        const insertAppoitmentQuery = `
    INSERT INTO citas (fecha, hora, motivo, estado, id_paciente, id_medico) 
    VALUES (?, ?, ?, 'pendiente', ?, ?);
  `;

        await connection.execute(insertAppoitmentQuery, [date, hour, reason, idPatient, idMedic]);

        await connection.commit();
        return { success: true, message: 'Cita programada correctamente' };
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

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
            return { success: false, message: 'No se encontraron citas para el paciente.' };
        }

        return { success: true, data: results };
    } catch (error) {
        console.error('Error al obtener el historial de citas:', error);
        return { success: false, message: 'Error al obtener el historial de citas' };
    }
};



module.exports = {
    obtenerCitas,
    obtenerPendientes,
    atenderCita,
    cancelarCita,
    getAppointmentPendingByPatient,
    programAppoitment,
    obtenerHistorialCitas,
    cancelarCitaPaciente,
    transporter,
    getCitasHistorialByPaciente
};
