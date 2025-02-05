/* Tendra el manejo de citas de los pacientes
    Aqui se puede agregar lo siguiente segun el enunciado:
        * Gestión de Citas
        * Atender Paciente
        * Cancelar Cita Paciente
*/
import { ToastContainer, toast } from 'react-toastify';
import { useContext, useEffect, useState } from "react";
import { Table } from "../../ui/components";
import { getCitasPendientesDr } from "./helpers/doctor";
import { AuthContext } from "../../auth/context/AuthContext";
import { ModalAtenderCita } from "./components/ModalAtenderCita";
import { ModalCancelarCita } from "./components/ModalCancelarCita";

import 'react-toastify/dist/ReactToastify.css';

export const ManagementAppoinmentsPage = () => {

  const notifySuccess = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);

  const { user } = useContext(AuthContext);

  const headers = ['ID', 'Fecha', 'Hora', 'Paciente', 'Motivo'];
  const [toaster, setToaster] = useState(false)
  const [citas, setCitas] = useState([])
  const [modalAtenderCita, setModalAtenderCita] = useState({ isOpen: false, data: null })
  const [modalCancelarCita, setModalCancelarCita] = useState({ isOpen: false, data: null })

  const fetchData = async () => {
    const citas = await getCitasPendientesDr(user.id);
    const filtrados = citas.map((cita) => ({
      id: cita.id_cita,
      fecha: new Date(cita.fecha).toLocaleDateString(),
      hora: cita.hora,
      nombre_paciente: cita.nombre_paciente,
      motivo: cita.motivo,
    }));
    setCitas(filtrados);
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // console.log("toaster");
    if (toaster) {
      notifySuccess("Cita atendida con éxito");
    }
  }, [toaster]);
  
  // const data = [
  //   {
  //     id: 1,
  //     fecha: "15/06/2024",
  //     hora: "06:47 hrs",
  //     paciente: "Hugo Martínez",
  //     motivo: "Gripe"
  //   },
  //   {
  //     id: 2,
  //     fecha: "14/06/2024",
  //     hora: "06:57 hrs",
  //     paciente: "Sebastian Martínez",
  //     motivo: "Resfriado"
  //   }
  // ]

  const onClickAceptar = (dato) => {
    // notifySuccess("Funciona");
    setModalAtenderCita({ isOpen: true, data: dato });
  }

  const onClickCancelar = (dato) => {
    dato = {
      ...dato,
      doctor: user.name,
    }
    setModalCancelarCita({ isOpen: true, data: dato });
    
  }

  const actions = [
    {
      color: 'green-500',
      colorHover: 'green-600',
      text: 'Atendido',
      icon: 'fa-solid fa-check',
      onClick: onClickAceptar
    },
    {
      color: 'red-500',
      colorHover: 'red-600',
      text: 'Cancelar',
      icon: 'fa-solid fa-trash',
      onClick: onClickCancelar
    },
  ]

  return (
    <>
      <h1 className="text-2xl font-bold my-4">ManagementAppoinmentsPage</h1>
      <Table
        headers={headers}
        data={citas}
        actions={actions}
      />

      { modalAtenderCita.isOpen && (
          <ModalAtenderCita
              isOpen={modalAtenderCita.isOpen}
              onClose={(valor) => {
                setModalAtenderCita({ isOpen: false, data: null })
              }}
              { ...modalAtenderCita.data }
              setCitas={setCitas}
          />
      )}
      { modalCancelarCita.isOpen && (
          <ModalCancelarCita
              isOpen={modalCancelarCita.isOpen}
              onClose={() => setModalCancelarCita({ isOpen: false, data: null })}
              { ...modalCancelarCita.data }
              setCitas={setCitas}
              setToaster={setToaster}
          />
      )}

<ToastContainer
          position="bottom-right"
          autoClose={3000}
          pauseOnHover
          theme="colored"
      />
    
    </>
  )
}
