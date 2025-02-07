import { Card } from '../../ui/components/Card'
import { useEffect, useState, useContext } from 'react';


import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalCita from '../../ui/components/ModalCita';
import ModalCitaMM from '../../ui/components/ModadlModifiCita';
import { Input } from '../../ui/components/Input';

export const AppointmentsRecordPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [modalData, setModalData] = useState({ isOpen: false, });
  const [modalDataMM, setModalDataMM] = useState({ isOpen: false, id:'',nombre:'' , estado:''});

  const [buscar, Bus] = useState("");


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

const handleMMeClick = async (CUI, nombre, estado) => {
  console.log('Modificar cita con CUI:', CUI, 'nombre:', nombre, 'estado:', estado);
  setModalDataMM({ isOpen: true, id: CUI , nombre: nombre, estado: estado}); 
};

const handleInputChange = (event) => {
  Bus(event.target.value);
};




const handleBuscarClick = async () => { // Agrega 'async' aquí
  console.log("Hora seleccionada:", buscar);

  try {
    const response = await fetch('http://localhost:3000/MediCare/citasPaciente', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cui: buscar }) // Enviar el CUI en el cuerpo de la petición
    });

    if (!response.ok) {
      throw new Error('Error al obtener la respuesta del servidor');
    }

    const data = await response.json(); // Convertir la respuesta a JSON
    setAppointments(data);

    console.log("RESPONSE", data); // Aquí obtendrás el array con las citas

  } catch (error) {
    console.error("Error:", error);
    toast.error('Hubo un problema al buscar la cita. Por favor, intenta nuevamente más tarde.');
  }
};





  return (
    <>
      <div className="grid grid-cols-3 p-4 gap-4">
        <ToastContainer />
        <div className="flex justify-start">
 
</div>

        <div className="col-span-3">
          <Card>
          <div className="flex justify-between items-center w-full">
  
  <button
    onClick={handleReserveClick}
    className="bg-primary-100 rounded-md w-[250px] h-9 text-text-90 font-bold">
    Crear Cita
  </button>

 
  <div className="flex items-center gap-2">
    <Input 
      type="text" 
      name="buscar" 
      value={buscar} 
      placeholder="Buscar por CUI" 
      onChange={handleInputChange}  
      style={{ width: "600px" }} // Forzar el ancho con CSS inline
    />
    <button
      onClick={handleBuscarClick}
      className="bg-primary-100 rounded-md w-[150px] h-9 text-text-90 font-bold">
      Buscar
    </button>
  </div>




</div>
<br />
<br />

            <h1 className="text-2xl font-bold text-text-100 text-center mb-4">Listado de citas activas</h1>
             
            <br />
            <table className="bg-bg-300 w-full col-span-10 text-sm text-center rtl:text-right text-text200 ">
              <thead className="bg-bg-200 text-xs text-text100 uppercase">
                <tr>
                  <th scope="col" className="px-6 py-3">Cui</th>
                  <th scope="col" className="px-6 py-3">nombre apellido</th>
                  <th scope="col" className="px-6 py-3">Fecha de la Cita</th>                  
                  <th scope="col" className="px-6 py-3">Hora</th> 
                  <th scope="col" className="px-6 py-3">estado</th>                  
                  <th scope="col" className="px-6 py-3">Modificar</th>
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
                    <td className="px-6 py-4">{appointment.estado}</td>                  
              
                    <td className="px-6 py-4">
                      <button className="bg-green-700 text-white rounded-md px-2 py-1" key={index} onClick={() => handleMMeClick(appointment.id, appointment.nombre_paciente, appointment.estado)}>Modificar</button>
                    </td>

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
                {
                  modalDataMM.isOpen && (
                      <ModalCitaMM
                          isOpen={modalDataMM.isOpen}
                          onClose={() => setModalDataMM({ ...modalDataMM, isOpen: false , id:'',nombre:''})}
                          cuiiD={modalDataMM.id}
                          nombre={modalDataMM.nombre}
                          estado={modalDataMM.estado}
                          
                      />
                  )
              }
            
      </div>
    </>
  )
}
