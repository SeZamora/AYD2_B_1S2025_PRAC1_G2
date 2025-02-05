const express = require('express');
const pool = require('../database/connection');


//This service will return the schedule of a medic by its id
const getScheduleByMedic = async (idMedic) => {
  const query = `
    SELECT h.dia, h.hora_inicio, h.hora_fin
    FROM horarios h
    WHERE h.id_medico = ?;
  `;
  const [rows] = await pool.query(query, [idMedic]);
  console.log(rows);
  return rows;
};



const getScheduleByDateAndMedic = async (idMedic, date) => {
  try {
    const dateObj = new Date(date);
    const daysOfWeek = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    const dayOfWeek = daysOfWeek[dateObj.getUTCDay()]; // Usar getUTCDay para evitar desfasamiento por zona horaria

    console.log(`Buscando horario para el médico ${idMedic} en la fecha ${date} (${dayOfWeek})`);

    const scheduleQuery = `
      SELECT h.dia, h.hora_inicio, h.hora_fin
      FROM horarios h
      WHERE h.id_medico = ? AND h.dia = ?;
    `;

    const [schedule] = await pool.query(scheduleQuery, [idMedic, dayOfWeek]);

    if (schedule.length === 0) {
      console.log('El médico no atiende en la fecha seleccionada.');
      return { success: false, message: 'El médico no atiende en la fecha seleccionada.' };
    }

    // Obtener citas del médico para la fecha especificada
    const appointmentQuery = `
      SELECT DISTINCT c.hora
      FROM citas c
      WHERE c.id_medico = ? AND c.fecha = ?;
    `;

    const [appointments] = await pool.query(appointmentQuery, [idMedic, date]);
    console.log(`Citas obtenidas para el médico ${idMedic} en la fecha ${date}:`, appointments);

    const busyHours = new Set(appointments.map(appointment => appointment.hora));

    const response = schedule.map(hour => {
      const { hora_inicio, hora_fin } = hour;
      const availableSchedule = [];
      const busySchedule = [];

      // Convertir hora_inicio y hora_fin a objetos Date
      let currentHour = new Date(`1970-01-01T${hora_inicio}Z`);
      const endHour = new Date(`1970-01-01T${hora_fin}Z`);

      console.log(`Horario del médico ${idMedic} el ${dayOfWeek}: de ${hora_inicio} a ${hora_fin}`);

      while (currentHour <= endHour) {
        const hourString = currentHour.toISOString().slice(11, 19);
        if (busyHours.has(hourString)) {
          busySchedule.push(hourString);
        } else {
          availableSchedule.push(hourString);
        }
        // Incrementar por una hora completa
        currentHour.setHours(currentHour.getHours() + 1);
      }

      return {
        dia: hour.dia,
        hora_inicio,
        hora_fin,
        disponible: availableSchedule,
        ocupado: busySchedule
      };
    });

    return { success: true, schedule: response };
  } catch (error) {
    console.error('Error al obtener los horarios:', error);
    return { success: false, message: 'Error al obtener los horarios2', error: error.message };
  }
};
module.exports = {
  getScheduleByMedic, 
  getScheduleByDateAndMedic
};