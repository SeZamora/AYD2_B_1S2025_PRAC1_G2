import { Card } from '../../ui/components/Card'
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../auth/context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AppointmentsRecordPage = () => {
  const [appointments, setAppointments] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch(`http://localhost:3000/MediCare/appitment/pending/${user.id}`)
      .then((response) => response.json())
      .then((data) => {
        setAppointments(data);
      });
  }, []);

  const cancelarCita = (id_cita) => {
    try{
      fetch(`http://localhost:3000/MediCare/cita/cancelarpaciente/${id_cita}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      toast.success("Se ha cancelado la cita exitosamente.");
      // esperar 2 segundos
      setTimeout(() => {
        // refresh the page
        window.location.reload();
      }, 2000);
    }
    catch (error) {
      toast.error('Hubo un problema al cancelar la cita. Por favor, intenta nuevamente más tarde.');
    }
  }

  return (
    <>
      <div className="grid grid-cols-3 p-4 gap-4">
        <ToastContainer />
        <div className="col-span-3">
          <Card>
            <h1 className="text-2xl font-bold text-text-100 text-center">Listado de citas activas</h1>
            <br />
            <table className="bg-bg-300 w-full col-span-5 text-sm text-center rtl:text-right text-text200 ">
              <thead className="bg-bg-200 text-xs text-text100 uppercase">
                <tr>
                  <th scope="col" className="px-6 py-3">Fecha de la Cita</th>
                  <th scope="col" className="px-6 py-3">Hora</th>
                  <th scope="col" className="px-6 py-3">Nombre del médico</th>
                  <th scope="col" className="px-6 py-3">Dirección de clinica</th>
                  <th scope="col" className="px-6 py-3">Motivo</th>
                  <th scope="col" className="px-6 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-bg-300">
                {appointments.map((appointment, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4">{appointment.fecha}</td>
                    <td className="px-6 py-4">{appointment.hora}</td>
                    <td className="px-6 py-4">{"Dr.(a) " + appointment.nombre + ' ' + appointment.apellido}</td>
                    <td className="px-6 py-4">{appointment.direccion_clinica}</td>
                    <td className="px-6 py-4">{appointment.motivo}</td>
                    <td className="px-6 py-4">
                      <button className="bg-red-700 text-white rounded-md px-2 py-1" key={index} onClick={() => cancelarCita(appointment.id_cita)}>Cancelar</button>
                    </td>
                  </tr>
                ))
                }
              </tbody>
            </table>
          </Card>
        </div>
      </div>
    </>
  )
}
