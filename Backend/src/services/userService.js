const express = require('express');
const pool = require('../database/connection');

const getDoctors = async (idPatient) => {
    const query =`
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




const createUsuario = async (usuarioData) => {
    const { nombre, apellido, genero, email, pass, direccion, fecha_nacimiento, foto, id_especialidad, id_rol} = usuarioData;
    //const existeUsuario= await verificarUsuario(email);
    //if(existeUsuario==null){
       
        const [result] = await pool.query(
            'INSERT INTO usuarios (nombre, apellido, genero, email, pass,direccion, fecha_nacimiento,foto,id_especialidad, id_rol) VALUES (?,?,?,?, SHA2(?, 256),?,?,?,?,?)',
            [nombre, apellido, genero, email, pass, direccion, fecha_nacimiento, foto, id_especialidad, id_rol]
        );
   
        return { message: 'Usuario Creado', exito: true};
    //}
   // return  { message: 'El usuario ya existe', exito: false}
   
}

const obtenerUsuario = async(email, pass) => {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE email=? AND pass=SHA2(?,256)',[email,pass])
    if (rows.length==0) {
        return { datos: null, mensaje: 'Usuario o contraseña incorrectos, intenten nuevamente' };
    }
       
    return  { datos: rows[0], mensaje: '¡Bienvenido!' }; ; 
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



module.exports = {
    createUsuario,
    obtenerUsuario,
    getDoctors,
    updateUserProfile,
    getUserById
};