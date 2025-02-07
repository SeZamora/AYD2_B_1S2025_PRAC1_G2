import { Card } from '../../ui/components/Card'
import { useEffect, useState, useContext } from 'react';


import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalCita from '../../ui/components/ModalCita';

export const AppointmentsRecordPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [modalData, setModalData] = useState({ isOpen: false, hora: '', fecha: '', doctorId: '' });

/*

const fakeAppointments = [
  {
    id_cita: 1,
    fecha: "2025-02-10",
    hora: "09:00 AM",
    Cui: "1234567890101"
  },
  {
    id_cita: 2,
    fecha: "2025-02-12",
    hora: "02:30 PM",
    Cui: "9876543210101"
  },
  {
    id_cita: 3,
    fecha: "2025-02-15",
    hora: "11:15 AM",
    Cui: "4567891230101"
  }
];
useEffect(() => {
    
      // Simular carga de datos
      setAppointments(fakeAppointments);
    }, []);
    */

  useEffect(() => {



    fetch(`http://localhost:3000/MediCare/citas`)
      .then((response) => response.json())
      .then((data) => {
        setAppointments(data);
     });
 }, []);


 const cancelarCita = async (idCita) => {
  console.log('Cancelando cita con ID:', idCita);
  try {
    const response = await fetch('http://localhost:3000/MediCare/appointment/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idCita }) // Enviar el ID en el cuerpo de la petición
    });

    if (!response.ok) {
      throw new Error('Error al cancelar la cita');
    }

    toast.success("Se ha cancelado la cita exitosamente.");
    
    // Esperar 2 segundos antes de recargar la página
    setTimeout(() => {
      window.location.reload();
    }, 2000);

  } catch (error) {
    toast.error('Hubo un problema al cancelar la cita. Por favor, intenta nuevamente más tarde.');
   
  }
};


  const handleReserveClick = () => {
    setModalData({ isOpen: true});
}

  return (
    <>
      <div className="grid grid-cols-3 p-4 gap-4">
        <ToastContainer />
        <div className="flex justify-start">
 
</div>

        <div className="col-span-3">
          <Card>
          <button
  onClick={() => handleReserveClick()}
  className="bg-primary-100 rounded-md w-[250px] h-9 text-text-90 font-bold">
      
       Crear Cita    
</button>

            <h1 className="text-2xl font-bold text-text-100 text-center">Listado de citas activas</h1>
            <br />
            <table className="bg-bg-300 w-full col-span-10 text-sm text-center rtl:text-right text-text200 ">
              <thead className="bg-bg-200 text-xs text-text100 uppercase">
                <tr>
                  <th scope="col" className="px-6 py-3">Cui</th>
                  <th scope="col" className="px-6 py-3">nombre apellido</th>
                  <th scope="col" className="px-6 py-3">Fecha de la Cita</th>                  
                  <th scope="col" className="px-6 py-3">Hora</th>                   
                  <th scope="col" className="px-6 py-3">Accion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-bg-300">
                {appointments.map((appointment, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4">{appointment.cui}</td>
                    <td className="px-6 py-4">{appointment.nombre_paciente}</td>
                    <td className="px-6 py-4">{appointment.fecha}</td>
                    <td className="px-6 py-4">{appointment.hora}</td>                  
              

                    <td className="px-6 py-4">
                      <button className="bg-red-700 text-white rounded-md px-2 py-1" key={index} onClick={() => cancelarCita(appointment.id)}>Cancelar</button>
                    </td>
                  </tr>
                ))
                }
              </tbody>
            </table>
          </Card>
        </div>
         {
                modalData.isOpen && (
                    <ModalCita
                        isOpen={modalData.isOpen}
                        onClose={() => setModalData({ ...modalData, isOpen: false })}
                        
                    />
                )
            }
      </div>
    </>
  )
}
