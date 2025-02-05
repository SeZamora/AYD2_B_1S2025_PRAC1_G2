const pool = require('../database/database');

const crearDoctor = async (datosDoctor) => {
    const { nombre, apellido, genero, email, pass, direccion, foto, id_especialidad } = datosDoctor;
    const [result] = await pool.query(
        'INSERT INTO usuarios (nombre, apellido, genero, email, pass, direccion, foto, id_especialidad) VALUES (?, ?, ?, ?, SHA2(?, 256), ?, ?, ?)',
        [nombre, apellido, genero, email, pass, direccion, foto, id_especialidad]
    );
    return { id_medico: result.insertId, ...datosDoctor };
};

const iniciarSesionDoctor = async (email, pass) => {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ? AND pass = SHA2(?, 256)', [email, pass]);
    if (rows.length === 0) {
        throw new Error('Correo o contraseña incorrectos');
    }
    return rows[0];
};

const establecerHorario = async (idDoctor, horario) => {
    const { dias, hora_inicio, hora_fin } = horario;

    const insertNewSchedule = 'INSERT INTO horarios (id_medico, dia, hora_inicio, hora_fin) VALUES ?';
    const scheduleData = dias.map(dia => [idDoctor, dia, hora_inicio, hora_fin]);

    await pool.query(insertNewSchedule, [scheduleData]);
    return { id_medico: idDoctor, dias, hora_inicio, hora_fin };
};

const actualizarHorario = async (idDoctor, horarios, hora_inicio, hora_fin) => {
    // const insertNewSchedule = 'UPDATE INTO horarios (id_medico, dia, hora_inicio, hora_fin) VALUES ?';
    // const scheduleData = horarios.map(horario => [idDoctor, horario.dia, horario.hora_inicio, horario.hora_fin]);
    
    const deleteOldSchedule = 'DELETE FROM horarios WHERE id_medico = ?';
    await pool.query(deleteOldSchedule, [idDoctor]);

    const insertNewSchedule = 'INSERT INTO horarios (id_medico, dia, hora_inicio, hora_fin) VALUES ?';
    const scheduleData = horarios.map(horario => [idDoctor, horario, hora_inicio, hora_fin]);

    await pool.query(insertNewSchedule, [scheduleData]);
    return { id_medico: idDoctor, horarios };
};

const obtenerHorario = async (idDoctor) => {

    const selectSchedule = 'SELECT dia, hora_inicio, hora_fin FROM horarios WHERE id_medico = ?';
    const [rows] = await pool.query(selectSchedule, [idDoctor]);
    if (rows.length > 0) {
        const { hora_inicio, hora_fin } = rows[0];
        const dias = rows.map(({ dia }) => dia);
        
        const horario = {
          hora_inicio,
          hora_fin,
          dias
        };
        return horario
      }
      return { hora_inicio: '00:00',  hora_fin: '00:00', dias: [] };
};

const getMedicsBySpecialty = async (specialty) => {
    try {
        const query = `
            SELECT u.id_usuario, u.nombre, u.apellido, e.nombre AS especialidad, u.direccion AS direccion_clinica, u.foto
            FROM usuarios u
            JOIN especialidades e ON u.id_especialidad = e.id_especialidad
            WHERE u.id_rol = 2 AND e.nombre = ?;
        `;

        const [results] = await pool.query(query, [specialty]);
        return { success: true, data: results };
    } catch (error) {
        console.error('Error al obtener los médicos:', error);
        return { success: false, message: 'Error al obtener los médicos' };
    }
};


module.exports = {
    crearDoctor,
    iniciarSesionDoctor,
    establecerHorario,
    actualizarHorario,
    obtenerHorario,
    getMedicsBySpecialty
};
