const pool = require('../database/database');

const obtenerPerfil = async (idDoctor) => {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE id_usuario = ?', [idDoctor]);
    if (rows.length === 0) {
        throw new Error('No se encontró el doctor');
    }
    return rows[0];
};

const actualizarPerfil = async (idDoctor, datosActualizados) => {
    const { nombre, apellido, genero, direccion, foto, id_especialidad } = datosActualizados;
    const [result] = await pool.query(
        'UPDATE usuarios SET nombre = ?, apellido = ?, genero = ?, direccion = ?, foto = ?, id_especialidad = ? WHERE id_usuario = ?',
        [nombre, apellido, genero, direccion, foto, id_especialidad, idDoctor]
    );
    if (result.affectedRows === 0) {
        throw new Error('No se encontró el doctor o no se realizaron cambios');
    }
    return { id_medico: idDoctor, ...datosActualizados };
};

module.exports = {
    obtenerPerfil,
    actualizarPerfil
};
