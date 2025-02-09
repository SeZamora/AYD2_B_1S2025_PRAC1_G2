import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from "../../hooks/useForm";
import { Label } from "../../ui/components";
import './styles.css';
import 'react-toastify/dist/ReactToastify.css';

export const RegisterPacient = () => {
    const navigate = useNavigate();

    const {
        nombre,
        apellido,
        cui,
        telefono,
        email,
        edad,
        genero,
        fecha_ingreso,
        onInputChange
    } = useForm({
        nombre: '',
        apellido: '',
        cui: '',
        telefono: '',
        email: '',
        edad: '',
        genero: '',
        fecha_ingreso: '',
    });

    const notifySuccess = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);

    const onRegisterSubmit = async (event) => {
       
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/MediCare/createPatient', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre,
                    apellido,
                    cui,
                    telefono,
                    correo: email,
                    edad,
                    genero,
                    fecha_ingreso,
                }),
            });

            const data = await response.json();

            if (data.exito) {
                notifySuccess('Paciente registrado exitosamente');
                navigate('/');
            } else {
                notifyError('Error al registrar el paciente');
            }
        } catch (error) {
            notifyError('Error al registrar el paciente');
        }
    }


    return (
        <>
            <div className="h-screen flex flex-col justify-center items-center">
                <div className="bg-bg-200 max-w-md w-full p-10 rounded-md">
                    <div className="flex justify-between mb-3">
                        <div>
                            <h1 className="text-2xl font-bold">Registro</h1>
                        </div>
                    </div>

                    <form>
                        <div className="flex items-center justify-center">
                            <div className="flex flex-col mr-3">
                                <Label htmlFor="nombre">Nombre:</Label>
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
                                <Label htmlFor="cui">CUI:</Label>
                                <input
                                    type="text"
                                    className="w-full bg-bg300 text-text200 px-4 py-2 rounded-md"
                                    name="cui"
                                    value={cui}
                                    onChange={onInputChange}
                                    placeholder="CUI"
                                />
                            </div>
                            <div className="flex flex-col">
                                <Label htmlFor="telefono">Teléfono:</Label>
                                <input
                                    type="tel"
                                    className="w-full bg-bg300 text-text200 px-4 py-2 rounded-md"
                                    name="telefono"
                                    value={telefono}
                                    onChange={onInputChange}
                                    placeholder="Teléfono"
                                />
                            </div>
                        </div>

                        <Label htmlFor="email">Correo electrónico:</Label>
                        <input
                            type="email"
                            className="w-full bg-bg300 text-text200 px-4 py-2 rounded-md"
                            name="email"
                            value={email}
                            onChange={onInputChange}
                            placeholder="example@mail.com"
                        />

                        <Label htmlFor="edad">Edad:</Label>
                        <input
                            type="number"
                            className="w-full bg-bg300 text-text200 px-4 py-2 rounded-md"
                            name="edad"
                            value={edad}
                            onChange={onInputChange}
                            placeholder="Edad"
                        />

                        <Label htmlFor="genero">Género:</Label>
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

                        <Label htmlFor="fecha_ingreso">Fecha de ingreso:</Label>
                        <input
                            className="w-full bg-bg300 text-text200 px-4 py-2 rounded-md"
                            type="date"
                            name="fecha_ingreso"
                            value={fecha_ingreso}
                            onChange={onInputChange}
                        />


                        <div className="flex items-center justify-center">
                            <button
                                className="bg-primary-100 px-4 py-1 hover:bg-primary200 rounded-md my-1 w-full text-text100 font-semibold"
                                onClick={onRegisterSubmit}
                            >
                                Regístrate
                            </button>
                        </div>
                    </form>

                </div>
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                pauseOnHover
                theme="colored"
            />
        </>
    );
};
