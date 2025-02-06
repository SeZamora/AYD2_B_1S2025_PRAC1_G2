const express = require('express');
const pool = require('../database/connection');

const getDoctors = async (idPatient) => {
    const query = `
    SELECT u.id_usuario, u.nombre, u.apellido, e.nombre AS especialidad, u.direccion AS direccion_clinica, u.foto
    FROM usuarios u
    JOIN especialidades e ON u.id_especialidad = e.id_especialidad
    WHERE u.id_rol = 2
    AND u.id_usuario NOT IN (
      SELECT c.id_medico
      FROM citas c
      WHERE c.id_paciente = ?
    );
  `;
    const [rows] = await pool.query(query, [idPatient]);
    return rows;
};
//Obtener todos los pacientes
const getAllPatients = async () => {
    const [rows] = await pool.query('SELECT * FROM paciente');
    return rows; 
};

// obtener paciente por el ID o CUID
const getPatientIdOrCui = async (idOrCui) => {
    const [rows] = await pool.query(
        'SELECT * FROM paciente WHERE id = ? OR cui = ? LIMIT 1',
        [idOrCui, idOrCui]
    );
    return rows.length > 0 ? rows[0] : null;
};

const getUserById = async (id) => {
    try {
        const query = `SELECT * FROM usuarios WHERE id_usuario = ?`;
        const [results] = await pool.query(query, [id]);

        if (results.length === 0) {
            return { success: false, message: 'Usuario no encontrado' };
        }

        return { success: true, data: results[0] };
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        return { success: false, message: 'Error al obtener el usuario' };
    }
};

const createPatient = async (usuarioData) => {
    const { nombre, apellido, cui, telefono, correo, edad, genero, fecha_ingreso } = usuarioData;


    const [result] = await pool.query(
        'INSERT INTO paciente (nombre, apellido, cui, telefono, correo, edad, genero, fecha_ingreso) VALUES (?,?,?,?,?,?,?,?)',
        [nombre, apellido, cui, telefono, correo, edad, genero, fecha_ingreso]
    );

    return { message: 'Usuario Creado', exito: true };
    //}
    // return  { message: 'El usuario ya existe', exito: false}

}


const deletePatient = async (userData) => {

    try {
        const [existingPatient] = await pool.query(
            'SELECT * FROM paciente WHERE cui = ?',
            [userData.cui]
        );

        if (existingPatient.length === 0) {
            return { message: 'Paciente no encontrado', exito: false };
        }

        // Eliminar paciente
        const [result] = await pool.query(
            'DELETE FROM paciente WHERE cui = ?',
            [userData.cui]
        );

        if (result.affectedRows > 0) {
            return { message: 'Paciente eliminado correctamente', exito: true };
        } else {
            return { message: 'Error al eliminar paciente', exito: false };
        }
    } catch (error) {
        console.error('Error en deletePatient:', error);
        return { message: 'Error interno del servidor', exito: false };
    }
};


const obtenerUsuario = async (email, pass) => {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE email=? AND pass=SHA2(?,256)', [email, pass])
    if (rows.length == 0) {
        return { datos: null, mensaje: 'Usuario o contraseña incorrectos, intenten nuevamente' };
    }

    return { datos: rows[0], mensaje: '¡Bienvenido!' };;
};

const updateUserProfile = async (id, updatedData) => {
    try {
        const { nombre, apellido, genero, pass, direccion, fecha_nacimiento } = updatedData;
        const query = `
            UPDATE usuarios
            SET nombre = ?, apellido = ?, genero = ?, pass = SHA2(?, 256), direccion = ?, fecha_nacimiento = ?
            WHERE id_usuario = ?;
        `;

        const [result] = await pool.query(query, [nombre, apellido, genero, pass, direccion, fecha_nacimiento, id]);

        if (result.affectedRows === 0) {
            return { success: false, message: 'Usuario no encontrado o no se pudo actualizar' };
        }

        return { success: true, message: 'Perfil actualizado correctamente' };
    } catch (error) {
        console.error('Error al actualizar el perfil:', error);
        return { success: false, message: 'Error al actualizar el perfil' };
    }
};


const getExpediente = async (id_nombre) => {
    try {
        // Buscar paciente por CUI o nombre completo
        const queryPaciente = `
            SELECT * FROM pacientes 
            WHERE cui = ? OR CONCAT(nombre, ' ', apellido) = ? 
            LIMIT 1;
        `;
        const [paciente] = await pool.query(queryPaciente, [id_nombre, id_nombre]);

        if (paciente.length === 0) {
            return { success: false, message: 'Paciente no encontrado' };
        }

        const pacienteId = paciente[0].id;

        // Obtener historial de consultas
        const queryHistorial = `
            SELECT e.id, e.fecha, e.diagnostico, e.tratamiento, d.nombre AS doctor_nombre, d.apellido AS doctor_apellido
            FROM expedientes e
            JOIN doctores d ON e.doctor_id = d.id
            WHERE e.paciente_id = ?;
        `;
        const [historial] = await pool.query(queryHistorial, [pacienteId]);

        // Obtener citas futuras
        const queryCitas = `
            SELECT c.id, c.fecha, c.hora, d.nombre AS doctor_nombre, d.apellido AS doctor_apellido, c.estado
            FROM citas c
            JOIN doctores d ON c.doctor_id = d.id
            WHERE c.paciente_id = ? AND c.fecha >= CURDATE();
        `;
        const [citas] = await pool.query(queryCitas, [pacienteId]);

        // Obtener recetas médicas
        const queryRecetas = `
            SELECT r.id, r.medicamento, r.dosis, r.indicaciones, r.firma_digital
            FROM recetas r
            JOIN expedientes e ON r.expediente_id = e.id
            WHERE e.paciente_id = ?;
        `;
        const [recetas] = await pool.query(queryRecetas, [pacienteId]);

        return {
            success: true,
            paciente: paciente[0],
            historial,
            citas,
            recetas
        };

    } catch (error) {
        console.error('Error al obtener el expediente:', error);
        return { success: false, message: 'Error interno del servidor' };
    }
};

module.exports = {
    createPatient,
    obtenerUsuario,
    getDoctors,
    getAllPatients,
    updateUserProfile,
    getUserById,
    getPatientIdOrCui,
    deletePatient,
    getExpediente
};