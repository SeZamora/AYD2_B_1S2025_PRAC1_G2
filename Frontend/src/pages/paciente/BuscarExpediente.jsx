import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Label } from "../../ui/components";
import "react-toastify/dist/ReactToastify.css";

export const BuscarExpediente = () => {
  const [busqueda, setBusqueda] = useState("");
  const [expediente, setExpediente] = useState(null);
  const [loading, setLoading] = useState(false);

  const onInputChange = (e) => setBusqueda(e.target.value);

  const notifyError = (message) => toast.error(message);

  const buscarExpediente = async () => {
    if (!busqueda.trim()) {
      notifyError("Ingrese un CUI o nombre para buscar");
      return;
    }

    setLoading(true);
    setExpediente(null);

    try {
      const response = await fetch(
        `http://localhost:3000/MediCare/expediente/${busqueda}`
      );
      const data = await response.json();

      if (data.success) {
        setExpediente(data);
      } else {
        notifyError("Paciente no encontrado");
      }
    } catch (error) {
      notifyError("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="bg-bg-200 max-w-md w-full p-10 rounded-md">
          <h1 className="text-2xl font-bold mb-4">Buscar Expediente</h1>

          {/* Campo de búsqueda */}
          <Label htmlFor="busqueda">CUI o Nombre:</Label>
          <input
            type="text"
            className="w-full bg-bg300 text-text200 px-4 py-2 rounded-md mb-4"
            name="busqueda"
            value={busqueda}
            onChange={onInputChange}
            placeholder="Ingrese CUI o Nombre"
          />

          <button
            className="bg-primary-100 px-4 py-2 hover:bg-primary200 rounded-md w-full text-text100 font-semibold"
            onClick={buscarExpediente}
            disabled={loading}
          >
            {loading ? "Buscando..." : "Buscar"}
          </button>
        </div>

        {/* Resultado de la búsqueda */}
        {expediente && (
          <div className="bg-bg-200 max-w-md w-full p-6 mt-4 rounded-md shadow-md max-h-[75vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-3">Datos del Paciente</h2>
            <p><strong>Nombre:</strong> {expediente.paciente.nombre} {expediente.paciente.apellido}</p>
            <p><strong>CUI:</strong> {expediente.paciente.cui}</p>
            <p><strong>Teléfono:</strong> {expediente.paciente.telefono}</p>
            <p><strong>Correo:</strong> {expediente.paciente.correo}</p>
            <p><strong>Edad:</strong> {expediente.paciente.edad}</p>
            <p><strong>Género:</strong> {expediente.paciente.genero}</p>
            <p><strong>Fecha de Ingreso:</strong> {new Date(expediente.paciente.fecha_ingreso).toLocaleDateString()}</p>

            {/* Historial de consultas */}
            <h2 className="text-xl font-bold mt-4 mb-2">Historial Médico</h2>
            {expediente.historial.length > 0 ? (
              expediente.historial.map((consulta) => (
                <div key={consulta.id} className="border-b pb-2 mb-2">
                  <p><strong>Fecha:</strong> {new Date(consulta.fecha).toLocaleDateString()}</p>
                  <p><strong>Diagnóstico:</strong> {consulta.diagnostico}</p>
                  <p><strong>Tratamiento:</strong> {consulta.tratamiento}</p>
                </div>
              ))
            ) : (
              <p>No hay historial médico registrado.</p>
            )}

            {/* Citas futuras */}
            <h2 className="text-xl font-bold mt-4 mb-2">Citas Programadas</h2>
            {expediente.citas.length > 0 ? (
              expediente.citas.map((cita) => (
                <div key={cita.id} className="border-b pb-2 mb-2">
                  <p><strong>Fecha:</strong> {new Date(cita.fecha).toLocaleDateString()}</p>
                  <p><strong>Hora:</strong> {cita.hora}</p>
                  <p><strong>Estado:</strong> {cita.estado}</p>
                </div>
              ))
            ) : (
              <p>No hay citas programadas.</p>
            )}

            {/* Recetas médicas */}
            <h2 className="text-xl font-bold mt-4 mb-2">Recetas Médicas</h2>
            {expediente.recetas.length > 0 ? (
              expediente.recetas.map((receta) => (
                <div key={receta.id} className="border-b pb-2 mb-2">
                  <p><strong>Medicamento:</strong> {receta.medicamento}</p>
                  <p><strong>Dosis:</strong> {receta.dosis}</p>
                  <p><strong>Indicaciones:</strong> {receta.indicaciones}</p>
                </div>
              ))
            ) : (
              <p>No hay recetas médicas registradas.</p>
            )}
          </div>
        )}
      </div>

      <ToastContainer position="bottom-right" autoClose={3000} pauseOnHover theme="colored" />
    </>
  );
};
