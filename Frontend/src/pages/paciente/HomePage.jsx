import { Card } from '../../ui/components/Card'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../auth/context/AuthContext';

export const HomePage = () => {
  const navigate = useNavigate();
  const [doctores, setDoctores] = useState([]);
  const [especialidad, setEspecialidad] = useState([]);
  const { user } = useContext(AuthContext);

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
    fetch(`http://localhost:3000/MediCare/medic/${user.id}`)
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
  }, [user.id]);

  const handleScheduleAppointment = (doctorID) => {
    navigate(`/schedule-appointment/${doctorID}`);
  }

  return (
    <>
      <div className="grid grid-cols-3 p-4 gap-4">
        <div className="col-span-3">
          <form className="flex" onSubmit={handleSubmit}>
            <select
              id="especialidad-select"
              name="especialidad-select"
              value={selectedEspecialidad}
              onChange={handleSelectChange}
              className="bg-bg-300 border border-gray-300 text-text-100 block w-full p-2.5 rounded-md"
            >
              <option value="0">Selecciona una especialidad</option>
              {especialidad.map((n) => (
                <option key={n.ID} value={n.Nombre}>
                  {n.Nombre}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="bg-primary-100 rounded-md w-20 disabled:bg-primary-300 text-text-100 font-bold ml-2"
            >
              Buscar
            </button>
          </form>
        </div>
      </div>
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
            <div className="flex flex-col justify-center items-center mt-3 mb-3">
              <img
                src={doctor.foto}
                alt="Imagen"
                className="h-60 w-60 rounded-full"
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-primary-100 px-4 py-1 rounded-md my-2 disabled:bg-primary-300 w-full text-text-100 font-bold"
                onClick={() => handleScheduleAppointment(doctor.id_usuario)}
              >
                Programar una cita
              </button>
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}
