import { ToastContainer, toast } from 'react-toastify';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { updateAtenderCita } from '../helpers/doctor';

import 'react-toastify/dist/ReactToastify.css';

export const ModalAtenderCita = ({ 
    isOpen, 
    onClose, 
    fecha, 
    hora, 
    nombre_paciente, 
    motivo, 
    id,

    setCitas,
}) => {
    const notifySuccess = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);


    const onSubmit = async () => {
        await updateAtenderCita(id)
        notifySuccess("Cita atendida con éxito");
        setCitas((citas) => citas.filter(cita => cita.id !== id));
        onClose(true);
        // setToaster(true);
    }



    return (
        <>
            <Transition show={isOpen}>
                <Dialog className="relative z-10" onClose={() => onClose(false)}>
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
                                            <h3 className="ml-2 text-lg font-semibold text-gray-900">Atender cita</h3>
                                            <hr />
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <h4>¿Esta seguro de marcar como atendido a la cita?</h4>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <h4>Paciente: {nombre_paciente}</h4>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <h4>Motivo: {motivo}</h4>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <h4>Fecha de la cita: {fecha} a las {hora}</h4>
                                        </div>
                                    </div>


                                    <div className="bg-bg-200 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-2">
                                        <button
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-primary-100 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={onSubmit}
                                        >
                                            Atendido
                                        </button>
                                        <div className="flex justify-center">
                                        </div>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={() => onClose(false)}
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
            <ToastContainer
          position="bottom-right"
          autoClose={3000}
          pauseOnHover
          theme="colored"
      />
        </>
    )
}
