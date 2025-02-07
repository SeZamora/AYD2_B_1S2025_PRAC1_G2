import { useForm } from "../../hooks/useForm";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const RecetasPage = () => {
    const {
        cuiPaciente,
        nombre,
        dosis,
        frecuencia,
        indicaciones,
        firmaDigital,            
        onInputChange
    } = useForm({
        cuiPaciente: '',
        nombre: '',
        dosis: '',
        frecuencia: '',
        indicaciones: '',
        firmaDigital: '',
    });

    const notifySuccess = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);

    const RecetaSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/MediCare/generarReceta', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cuiPaciente, 
                    medicamentos: [
                        {
                            nombre,
                            dosis,
                            frecuencia,
                            indicaciones,
                            firmaDigital
                        }
                    ]
                }),
            });

            const data = await response.json();
            console.log(data.message);

            if (data.message==='Receta generada correctamente') {
                notifySuccess('Receta generada correctamente');
            } else if (data.message==='Paciente no encontrado') {
                notifyError('Paciente no encontrado');
            } else if (data.message==='Faltan datos obligatorios en uno o más medicamentos') {
                notifyError('Faltan datos obligatorios en uno o más medicamentos');
                  
            }else{
                notifyError('Error al generar la receta');
            }
        } catch (error) {
            notifyError('Error al generar la receta');
        }
    };

    return (
        <>
            <div className="h-screen flex flex-col justify-center items-center">
                <div className="bg-bg-200 max-w-md w-full p-10 rounded-md">
                    <h1 className="text-2xl font-bold text-center">Generar Receta</h1>
                    
                    <form onSubmit={RecetaSubmit}>  
                        <h5 htmlFor="cuiPaciente">Cui:</h5>
                        <input
                            type="text"
                            className="w-full bg-bg300 text-text200 px-4 py-2 rounded-md mb-3"
                            name="cuiPaciente"
                            value={cuiPaciente}
                            onChange={onInputChange}
                            placeholder="CUI del paciente"
                        />

                        <h5 htmlFor="nombre">Nombre del medicamento:</h5>
                        <input
                            type="text"
                            className="w-full bg-bg300 text-text200 px-4 py-2 rounded-md mb-3"
                            name="nombre"
                            value={nombre}
                            onChange={onInputChange}
                        />

                        <h5 htmlFor="dosis">Dosis:</h5>
                        <input
                            type="text"
                            className="w-full bg-bg300 text-text200 px-4 py-2 rounded-md mb-3"
                            name="dosis"
                            value={dosis}
                            onChange={onInputChange}
                        />

                        <h5 htmlFor="frecuencia">Frecuencia:</h5>
                        <input
                            type="text"
                            className="w-full bg-bg300 text-text200 px-4 py-2 rounded-md mb-3"
                            name="frecuencia"
                            value={frecuencia}
                            onChange={onInputChange}
                        />

                        <h5 htmlFor="indicaciones">Indicaciones:</h5>
                        <input
                            type="text"
                            className="w-full bg-bg300 text-text200 px-4 py-2 rounded-md mb-3"
                            name="indicaciones"
                            value={indicaciones}
                            onChange={onInputChange}
                        />

                        <h5 htmlFor="firmaDigital">Firma Digital:</h5>
                        <input
                            type="text"
                            className="w-full bg-bg300 text-text200 px-4 py-2 rounded-md mb-3"
                            name="firmaDigital"
                            value={firmaDigital}
                            onChange={onInputChange}
                        />

                        <div className="flex items-center justify-center">
                            <button 
                                type="submit"
                                className="bg-primary-100 px-4 py-1 hover:bg-primary200 rounded-md my-1 w-full text-text100 font-semibold"
                            >
                                Crear Receta
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <ToastContainer position="bottom-right" autoClose={3000} pauseOnHover theme="colored" />
        </>
    );
};
