import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { updateCancelarCita } from '../helpers/doctor';
import { Label } from '../../../ui/components';
import { useForm } from '../../../hooks/useForm';

export const ModalCancelarCita = (
    { 
        isOpen,
        onClose,
        fecha: fechaCita,
        hora: horaCita,
        id,
        doctor,

        setCitas,
    }) => {
    const notifySuccess = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);


    const onSubmit = async () => {
        const data = {
            fechaCita,
            horaCita,
            doctor,
            motivo,
            mensajeDisculpas,
        }

        // console.log(data);
        await updateCancelarCita(id, data)
        // console.log(id, 'id cita');
        setCitas((citas) => citas.filter(cita => cita.id !== id));
        onClose();
    }


    const {
        motivo,
        mensajeDisculpas,
        onInputChange,
    } = useForm({
        motivo: '',
        mensajeDisculpas: '',
    });



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
                                            <h3 className="ml-2 text-lg font-semibold text-gray-900">Cancelar cita</h3>
                                            <hr />
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <h4>¿Esta seguro de cancelar la cita?</h4>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <div className="flex flex-col mr-3">

                                                <Label htmlFor="especialidad">Fecha:</Label>
                                                <input
                                                    type="text"
                                                    className="w-full bg-bg300 text-text200 px-4 py-2 rounded-md"
                                                    value={fechaCita}
                                                    readOnly
                                                    placeholder="Fecha"
                                                />
                                            </div>
                                            <div className="flex flex-col">
                                                <Label htmlFor="direccion">Hora:</Label>
                                                <input
                                                    type="text"
                                                    className="w-full bg-bg300 text-text200 px-4 py-2 rounded-md"
                                                    // name="hora_"
                                                    value={horaCita}
                                                    readOnly
                                                    // onChange={onInputChange}
                                                    placeholder="Hora"

                                                />
                                            </div>
                                        </div>

                                        <Label htmlFor="especialidad">Nombre del medico:</Label>
                                        <input
                                            type="text"
                                            className="w-full bg-bg300 text-text200 px-4 py-2 rounded-md"
                                            value={doctor}
                                            readOnly
                                            placeholder="Fecha"
                                        />

                                        <Label htmlFor="especialidad">Motivo de la cita cancelada:</Label>
                                        <input
                                            type="text"
                                            className="w-full bg-bg300 text-text200 px-4 py-2 rounded-md"
                                            name="motivo"
                                            value={motivo}
                                            onChange={onInputChange}
                                            placeholder="Motivo de la cita cancelada"
                                        />

                                        <Label htmlFor="especialidad">Mensaje de disculpas por la cancelacion:</Label>
                                        <input
                                            type="text"
                                            className="w-full bg-bg300 text-text200 px-4 py-2 rounded-md"
                                            name="mensajeDisculpas"
                                            value={mensajeDisculpas}
                                            onChange={onInputChange}
                                            placeholder="Mensaje de disculpas"
                                        />
                                    </div>


                                    <div className="bg-bg-200 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-2">
                                        <button
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-primary-100 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={onSubmit}
                                        >
                                            Cancelar cita
                                        </button>
                                        <div className="flex justify-center">
                                            <ToastContainer />
                                        </div>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={onClose}
                                        >
                                            Cerrar
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
