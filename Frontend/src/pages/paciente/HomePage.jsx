import { Card } from '../../ui/components/Card'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


export const HomePage = () => {
  const navigate = useNavigate();
  const [doctores, setDoctores] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/MediCare/getAllPatients`)
      .then((response) => response.json())
      .then((data) => {
        setDoctores(data.pacientes);
      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
      });
  }, []); // Array vacío como segundo parámetro para que solo se ejecute una vez al montar el componente
  

  const handleEditPaciente = (pacienteId) => {
    navigate(`/editar-paciente/${pacienteId}`);
  }

  const handleEliminarPaciente = (pacienteCui) => {
    try {
      fetch(`http://localhost:3000/MediCare/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cui: pacienteCui }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.exito) {
            setDoctores(doctores.filter((paciente) => paciente.cui !== pacienteCui));
          } else {
            alert('No se pudo eliminar el paciente');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      }catch (error) {
        console.error('Error:', error);
      }
  }

  return (
    <>

      <div className="grid grid-cols-3 p-4 gap-4 ">
        {doctores.map((paciente) => (
          <Card key={paciente.id}>
            <h1 className="text-2xl font-bold text-center">
               {paciente.nombre + ' ' + paciente.apellido + ' ' + paciente.id}
            </h1>
            <br />
            <div className="flex ">
              <label className="text-xl font-bold mr-2">Nombre:</label>
              <h1 className="text-xl">
                {paciente.nombre + ' ' + paciente.apellido}
              </h1>
            </div>
            <div className="flex ">
              <label className="text-xl font-bold mr-2">CUI:</label>
              <h1 className="text-xl">
                {paciente.cui}
              </h1>
            </div>
            
            <div className="flex items-center justify-center">

              <button
                className="bg-red-700 px-4 py-1 rounded-md my-2 disabled:bg-primary-300 w-full text-text-100 font-bold"
                onClick={() => handleEliminarPaciente(paciente.cui)}
              >
                Eliminar
              </button>
              
              <button
                className="bg-green-700 px-4 py-1 rounded-md my-2 disabled:bg-primary-300 w-full text-text-100 font-bold ml-2"
                onClick={() => handleEditPaciente(paciente.id)}
              >
                Editar
              </button>
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}
