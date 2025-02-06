import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { Input } from '../../ui/components/Input';


//import { AuthContext } from '../../auth/context/AuthContext';

export default function ModalCita({ isOpen, onClose }) {

        const [cui, setCui] = useState('');
        const [fecha, setFecha] = useState('');
        const [hora, setHora] = useState('');
    
        const Reservar = () => {
            if (!cui) {
                toast.error('Debe ingresar un CUI válido.');
                return;
            }
    
            if (!fecha) {
                toast.error('Debe seleccionar una fecha.');
                return;
            }
    
            const fechaSeleccionada = new Date(fecha + 'T00:00:00'); // Asegura que se obtiene el día correcto
            const diaSemana = fechaSeleccionada.getUTCDay(); // 0 = Domingo, 6 = Sábado
    
            if (diaSemana === 0) {
                toast.error('No se pueden agendar citas los domingos.');
                return;
            }
    
            if (!hora) {
                toast.error('Debe seleccionar una hora.');
                return;
            }
    
            const [horaSeleccionada, minutos] = hora.split(':').map(Number);
            if (horaSeleccionada < 7 || horaSeleccionada > 19 || (horaSeleccionada === 19 && minutos > 0)) {
                toast.error('El consultorio solo atiende de 7:00 AM a 7:00 PM.');
                return;
            }
    
            toast.success('Cita validada correctamente.');
        };
    
       
    /*nst notifySuccess = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);
    


    const onSubmit = async (data) => {

        try {
            const response = await fetch(`http://localhost:3000/MediCare/appoitment/programed`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                idMedic: doctorId,
                day: dia,
                hour: hora,
                date: fecha,
                reason: motivo,
                idPacient: id
              }),
            });
    
            if (!response.ok) {
                notifyError("Error al reservar cita");
            } else {
                const data = await response.json();
                if (data.error) {
                  notifyError(data.error);
                } else {
                  notifySuccess("Cita reservada exitosamente");
            }
          }
        } catch (error) {
          console.error("Error:", error);
            notifyError("Error al reservar cita");
        }

        onClose()
      };*/

    return (
        <>
            <Transition show={isOpen}>
                <Dialog className="relative z-10" onClose={onClose}>
                    <TransitionChild
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </TransitionChild>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <TransitionChild
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <DialogPanel className="relative transform overflow-hidden rounded-lg bg-bg-200 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <br />
                                    <div className="col-span-3">
                                        <h1 className="text-2xl font-bold text-center">Agendar Cita</h1>
                                    </div>
                                    <div className="col-span-1 col-start-2">
                                        <br />
                                        <form>
                                        <div className="flex items-center justify-center">
                                            <h4>CUI del paciente</h4>
                                        </div>
                                        <div className=" sm:px-6">
                                            <div className="grid grid-cols-1 gap-4">
                                                <Input
                                                    type="text"
                                                    name="cui"
                                                    value={cui}
                                                    onChange={(e) => setCui(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <br/>
                                        <div className="flex items-center justify-center">
                                            <h4>Fecha</h4>
                                        </div>
                                        <div className=" sm:px-6">
                                            <div className="grid grid-cols-1 gap-4">
                                            <Input
                                                type="date"
                                                name="fecha"
                                                value={fecha}
                                                onChange={(e) => setFecha(e.target.value)}
                                            />
                                        </div>
                                        </div>
                                        <br/>
                                        <div className="flex items-center justify-center">
                                            <h4>Hora de la cita</h4>
                                        </div>
                                            <div className=" sm:px-6">
                                            <div className="grid grid-cols-1 gap-4">
                                            <Input
                                                type="time"
                                                name="hora"
                                                value={hora}
                                                onChange={(e) => setHora(e.target.value)}
                                            />
                                            </div>
                                            </div>
                                        </form>
                                    </div>

                            <br />


                                    <div className="bg-bg-200 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-2">
                                        <button
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-primary-100 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={Reservar}
                                        >
                                            Reservar
                                        </button>
                                        <div className="flex justify-center">
                                            <ToastContainer />
                                        </div>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={onClose}
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
