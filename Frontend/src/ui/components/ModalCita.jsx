import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useContext } from 'react';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { Input } from '../../ui/components/Input';
import { Label } from '../../ui/components/Label';

import { AuthContext } from '../../auth/context/AuthContext';

export default function ModalCita({ isOpen, onClose, doctorId, hora, fecha, dia }) {
    const notifySuccess = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);
    const { user } = useContext(AuthContext);

    const [motivo, setMotivo] = useState('')

    const onSubmit = async (data) => {
        console.log('Doctor:', doctorId, 'Hora:', hora, 'Fecha:', fecha, 'Motivo:', motivo, 'Paciente:', user.id);
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
                idPacient: user.id
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
      };

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
                                    <div className=" px-4 py-5 sm:px-6">
                                        <div className="flex items-center justify-center">
                                            <h3 className="ml-2 text-lg font-semibold text-gray-900">Reservar Cita</h3>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <h4>Doctor: {doctorId}</h4>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <h4>Hora de la cita: {hora}</h4>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <h4>Fecha de la cita: {fecha}</h4>
                                        </div>
                                    </div>
                                    <form className="space-y-4 " onSubmit={onSubmit}>
                                        <div className=" sm:px-6">
                                            <div className="grid grid-cols-1 gap-4">
                                                <div>
                                                    <Label>Motivo de la cita</Label>
                                                    <Input type="text" name="motivo" value={motivo}
                                                        onChange={(e) => setMotivo(e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                    </form>


                                    <div className="bg-bg-200 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-2">
                                        <button
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-primary-100 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={onSubmit}
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
