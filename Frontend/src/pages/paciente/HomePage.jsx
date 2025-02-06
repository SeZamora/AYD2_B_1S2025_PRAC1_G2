import { Card } from '../../ui/components/Card'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';


export const HomePage = () => {
  const navigate = useNavigate();
  const [doctores, setDoctores] = useState([]);
  const [especialidad, setEspecialidad] = useState([]);


  const [selectedEspecialidad, setSelectedEspecialidad] = useState('0');

  const handleSelectChange = (e) => {
    setSelectedEspecialidad(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes acceder al valor seleccionado
    console.log('Especialidad seleccionada:', selectedEspecialidad);
    fetch(`http://localhost:3000/MediCare/specialty/${selectedEspecialidad}`)
      .then((response) => response.json())
      .then((data) => {
        setDoctores(data);
      });
  };

  useEffect(() => {
    fetch(`http://localhost:3000/MediCare/medic/${7}`)
      .then((response) => response.json())
      .then((data) => {
        setDoctores(data);
        const especialidadesSet = new Set();
        const especialidadesArray = [];

        data.forEach((doctor) => {
          if (!especialidadesSet.has(doctor.especialidad)) {
            especialidadesSet.add(doctor.especialidad);
            especialidadesArray.push({ ID: especialidadesArray.length, Nombre: doctor.especialidad });
          }
        });

        setEspecialidad(especialidadesArray);
      });
  });

  const handleScheduleAppointment = (doctorID) => {
    navigate(`/schedule-appointment/${doctorID}`);
  }

  return (
    <>

      <div className="grid grid-cols-3 p-4 gap-4 ">
        {doctores.map((doctor) => (
          <Card key={doctor.id_usuario}>
            <h1 className="text-2xl font-bold text-center">
              Doctor(a) {doctor.nombre + ' ' + doctor.apellido}
            </h1>
            <br />
            <div className="flex ">
              <label className="text-xl font-bold mr-2">Especialidad:</label>
              <h1 className="text-xl">
                {doctor.especialidad}
              </h1>
            </div>
            <div className="col-span-3">
              <label className="text-xl font-bold mr-2">Direción de la clinica:</label>
              <h1 className="text-xl ">{doctor.direccion_clinica}</h1>
            </div>
            
            <div className="flex items-center justify-center">
              <button
                className="bg-primary-100 px-4 py-1 rounded-md my-2 disabled:bg-primary-300 w-full text-text-100 font-bold"
                onClick={() => handleScheduleAppointment(doctor.id_usuario)}
              >
                Programar una cita
              </button>

              <button
                className="bg-primary-100 px-4 py-1 rounded-md my-2 disabled:bg-danger-300 w-full text-text-100 font-bold"
                onClick={() => handleScheduleAppointment(doctor.id_usuario)}
              >
                Eliminar
              </button>
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}
