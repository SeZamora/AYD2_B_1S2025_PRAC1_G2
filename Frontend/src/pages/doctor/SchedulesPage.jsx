/* Tendra la gestion de los horarios del medico
    Aqui se puede agregar lo siguiente segun el enunciado:
        * Establecer Horarios
        * Actualizar horarios
*/

import { useContext, useEffect, useState } from "react";
import { getHorarioAtencion, updateHorarioAtencion } from "./helpers/doctor";
import { AuthContext } from "../../auth/context/AuthContext";

export const SchedulesPage = () => {

  const { user } = useContext(AuthContext);

  const [diasSeleccionados, setDiasSeleccionados] = useState([]);
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');

  const fetchData = async() => {
    const horario = await getHorarioAtencion(user.id);
    setDiasSeleccionados(horario.dias.map(dia => {
      switch (dia) {
        case 'lunes':
          return 'Lunes';
        case 'martes':
          return 'Martes';
        case 'miercoles':
          return 'Miércoles';
        case 'jueves':
          return 'Jueves';
        case 'viernes':
          return 'Viernes';
        case 'sabado':
          return 'Sábado';
        case 'domingo':
          return 'Domingo';
        default:
          return dia;
      }
    }));
    setHoraInicio(horario.hora_inicio)
    setHoraFin(horario.hora_fin)
  }

  useEffect(() => {
    fetchData();
  }, [])
  

  const toggleDiaSeleccionado = (dia) => {
    setDiasSeleccionados((prevDias) => 
      prevDias.includes(dia) ? prevDias.filter(d => d !== dia) : [...prevDias, dia]
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (diasSeleccionados.length === 0) {
      alert('Por favor, selecciona al menos un día.');
      return;
    }
    if (horaInicio >= horaFin) {
      alert('La hora de inicio debe ser anterior a la hora de fin.');
      return;
    }
    console.log('Días seleccionados:', diasSeleccionados);
    console.log('Hora de inicio:', horaInicio);
    console.log('Hora de fin:', horaFin);
    const horarios = {
      hora_inicio: horaInicio,
      hora_fin: horaFin,
      horarios: diasSeleccionados
    }

    await updateHorarioAtencion(user.id, horarios);
  };

  const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  // Lun-Mar-Mier-Jue-Vier-Sab-Dom
  return (
    <div className="mt-3 max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Establecer Horario de Atención</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Días de atención:</label>
          <div className="flex flex-wrap gap-2">
            {diasSemana.map((dia) => (
              <button
                type="button"
                key={dia}
                onClick={() => toggleDiaSeleccionado(dia)}
                className={`py-2 px-4 rounded ${diasSeleccionados.includes(dia) ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                {dia}
              </button>
            ))}
            <p><b>Nota:</b> Los dias de atencion aparecen en color verde</p>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="hora-inicio" className="block text-gray-700">Hora de inicio:</label>
          <input
            type="time"
            id="hora-inicio"
            value={horaInicio}
            onChange={(e) => setHoraInicio(e.target.value)}
            className="mt-2 p-2 border rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="hora-fin" className="block text-gray-700">Hora de fin:</label>
          <input
            type="time"
            id="hora-fin"
            value={horaFin}
            onChange={(e) => setHoraFin(e.target.value)}
            className="mt-2 p-2 border rounded w-full"
            required
          />
        </div>
        <p className="mb-2"><b>Nota:</b> El formato de los horarios es 24 hrs</p>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Guardar Horario</button>
      </form>
    </div>
  );
}
