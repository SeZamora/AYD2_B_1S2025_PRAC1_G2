/* Tendra el ver y actualizar perfil del medico
    Aqui se puede agregar lo siguiente segun el enunciado:
      * Ver y Actualizar Perfil
*/

import { useContext, useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { ToastContainer, toast } from 'react-toastify';
import { Label } from "../../ui/components";
import { getDoctorProfile, putDoctorProfile } from "./helpers/doctor";
import { AuthContext } from "../../auth";

export const EditProfilePage = () => {

  const { user } = useContext(AuthContext);
  const [data, setData] = useState();

  const {
    rol,
    nombre,
    apellido,
    fecha_nacimiento,
    genero,
    email,
    passwor,
    foto,
    especialidad,
    direccion,
    onInputChange,
    setFormState
} = useForm({
    rol: 0,
    email: '',
    passwor: '',
    nombre: '',
    apellido: '',
    fecha_nacimiento: '',
    genero: '',
    foto: '',
    especialidad: 0,
    direccion: '',
});

  const fetchData = async() => {

    const newData = await getDoctorProfile(user.id);
    setFormState({
      rol: newData.rol || 0,
      email: newData.email || '',
      passwor: newData.passwor || '',
      nombre: newData.nombre || '',
      apellido: newData.apellido || '',
      fecha_nacimiento: newData.fecha_nacimiento || '',
      genero: newData.genero || '',
      foto: newData.foto || '',
      especialidad: newData.id_especialidad || 0,
      direccion: newData.direccion || '',
    });
  }

  const notifySuccess = (message) => toast.success(message);
  
  useEffect(() => {
    fetchData();
  }, [])

  const onRegisterSubmit = async (event) => {
    event.preventDefault();

    const dataUser = {
      nombre,
      apellido,
      genero,
      direccion,
      foto,
      id_especialidad: especialidad ? especialidad * 1 : null,
    }

    console.log(dataUser);

    const respuesta = await putDoctorProfile(user.id, dataUser);
        if (respuesta) {
          notifySuccess("Perfil actualizado");
        }
        //     notifySuccess(respuesta.message);
        // } else if (!respuesta.exito && !respuesta.e) {
        //     notifyError(respuesta.message);
        // } else {
        //     notifyError("Error interno en el servidor");
        // }
  }




  return (
    <>
<div className="mt-3 max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Perfil</h1>
      {/* <form onSubmit={handleSubmit}> */}
      <form>
        <div className="flex items-center justify-center">
          <div className="flex flex-col mr-3">

            <Label htmlFor="name">Nombre:</Label>
            <input
              type="text"
              className="w-full bg-bg300 text-text200 px-4 py-2 rounded-md"
              name="nombre"
              value={nombre}
              onChange={onInputChange}
              placeholder="Nombre"
            />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="apellido">Apellido</Label>
            <input
              type="text"
              className="w-full bg-bg300 text-text200 px-4 py-2 rounded-md"
              name="apellido"
              value={apellido}
              onChange={onInputChange}
              placeholder="Apellido"
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex flex-col mr-3">
            <Label htmlFor="genero">Genero:</Label>
            <select
              className="w-full bg-bg300 text-text-200 px-4 py-2 rounded-md"
              name="genero"
              value={genero}
              onChange={onInputChange}
            >
              <option value="">Selecciona tu género</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
            </select>
          </div>
          <div className="flex flex-col">
            <Label htmlFor="foto">Imagen de perfil:</Label>
            <input
              type="text"
              className="w-full bg-bg300 text-text200 px-4 py-2 rounded-md"
              name="foto"
              value={foto}
              onChange={onInputChange}
              placeholder="Ingresa la url"
            />
          </div>
        </div>

        <Label htmlFor="genero">Dirección de correo electrónico:</Label>
        <input
          type="email"
          className="w-full bg-bg300 text-text200 px-4 py-2 rounded-md"
          name="email"
          value={email}
          onChange={onInputChange}
          placeholder="example@mail.com"
        />
        {
          rol === "1" ?
            <>
              <Label htmlFor="fecha_nacimiento">Fecha de nacimiento:</Label>
              <input
                className="w-full bg-bg300 text-text200 px-4 py-2 rounded-md"
                type="date"
                name="fecha_nacimiento"
                value={fecha_nacimiento}
                onChange={onInputChange}
              />
            </>
            :
            <div className="flex items-center justify-center">
              <div className="flex flex-col mr-3">

                <Label htmlFor="especialidad">Especialidad:</Label>
                <select
                  className="w-full bg-bg300 text-text-200 px-4 py-2 rounded-md"
                  name="especialidad"
                  value={especialidad}
                  onChange={onInputChange}
                >
                  <option value="">Selecciona tu especialidad</option>
                  <option value={1}>Cardiología</option>
                  <option value={2}>Dermatología</option>
                  <option value={3}>Pediatría</option>
                  <option value={4}>Neurología</option>
                  <option value={5}>Ginecología</option>
                  <option value={6}>Oftalmología</option>
                </select>
              </div>
              <div className="flex flex-col">
                <Label htmlFor="direccion">Direccion de la Clinica:</Label>
                <input
                  type="text"
                  className="w-full bg-bg300 text-text200 px-4 py-2 rounded-md"
                  name="direccion"
                  value={direccion}
                  onChange={onInputChange}
                  placeholder="Direccion de la clinica"
                />
              </div>
            </div>

        }


        <div className="flex items-center justify-center my-3">

          <div className="">
            <div className="">
              {foto && (
                <img
                  src={foto}
                  alt="Preview"
                  className="rounded-full"
                  style={{ maxWidth: "100px" }}
                />
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <button className="bg-primary-100 px-4 py-1 hover:bg-primary200 rounded-md my-1 w-full text-text100 font-semibold "
            onClick={onRegisterSubmit}
          >
            Actualizar Perfil
          </button>
        </div>
      </form>
    </div>
<ToastContainer
                position="bottom-right"
                autoClose={3000}
                pauseOnHover
                theme="colored"
            />
    </>
    
  )
}
