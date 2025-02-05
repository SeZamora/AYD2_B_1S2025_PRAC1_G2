
/* Tendra el historial de citas
    Aqui se puede agregar lo siguiente segun el enunciado:
        * Historial de Citas
*/

import { useContext, useEffect, useState } from "react";
import { Table } from "../../ui/components"
import { getHistorial } from "./helpers/doctor";
import { AuthContext } from "../../auth/context/AuthContext";

export const AppointmentsRecordPage = () => {
  const { user } = useContext(AuthContext);
  const headers = ['Cita', 'Fecha', 'Hora', 'Paciente', 'Estado de la cita'];


  const [data, setData] = useState([]);

  const fetchData = async () => {
    const newData = await getHistorial(user.id);
    const updatedData = newData.map((item, index) => {
        return {
          id: index + 1,
          ...item,
        };
    });
    setData(updatedData);
  }

  useEffect(() => {
    fetchData();
  }, [])
  

  return (
    <>
      <h1 className="text-2xl font-bold my-4">Historial de citas</h1>
      <Table
        headers={headers}
        data={data}
        // actions={actions}
      />
    
    </>
  )
}
