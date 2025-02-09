import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { Input } from '../../ui/components/Input';
import { useForm } from "../../hooks/useForm";
import { useState } from 'react';

//import { AuthContext } from '../../auth/context/AuthContext';

export default function ModalCita({ isOpen, onClose ,cuiiD, nombre,estado}) {
    const [appointmentStatus, setAppointmentStatus] = useState(estado || 'Pendiente'); 


    
    const idCita = cuiiD
    const status= estado
    const nom = nombre
    console.log('ID:', idCita, 'Nombre:', status);
   

            
        const  {           
           
                    date,
                    hour,  
                    onInputChange                  
                } = useForm({
                    
                    date: '',
                    hour: '',
                    
                });
                const notifySuccess = (message) => toast.success(message);
                const notifyError = (message) => toast.error(message);
            
               
                
                
                  

                  console.log('Estado:', status);
                  
                  const handleStatusChange = (e) => {
                    const newStatus = e.target.value;
                    setAppointmentStatus(newStatus);  // Solo actualiza si el usuario cambia el valor
                };
                  

                  
                  
                const CitaSubmit = async (event) => {
                    event.preventDefault();
                    console.log('Estado enviado:', appointmentStatus);
                   
                    const hoy = new Date();
                     hoy.setHours(0, 0, 0, 0); // Elimina la hora para comparar solo la fecha
            
                    // Validaciones
                    if (!date) {
                        notifyError('Debe seleccionar una date.');
                        return;
                    }
            
                    const dateSeleccionada = new Date(date + 'T00:00:00');
                    if (dateSeleccionada < hoy) {
                        notifyError('No se pueden agendar citas en fechas pasadas.');
                        return;
                    }

                    const diaSemana = dateSeleccionada.getUTCDay();
                    if (diaSemana === 0) {
                        notifyError('No se pueden agendar citas los domingos.');
                        return;
                    }
            
                    if (!hour) {
                        notifyError('Debe seleccionar una hour.');
                        return;
                    }
            
                    const [hourSeleccionada, minutos] = hour.split(':').map(Number);
                    if (hourSeleccionada < 7 || hourSeleccionada > 19 || (hourSeleccionada === 19 && minutos > 0)) {
                        notifyError('El consultorio solo atiende de 7:00 AM a 7:00 PM.');
                        return;
                    }

                    
                    try {
                       
                        const response = await fetch('http://localhost:3000/MediCare/appointment/edit', {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                idCita,                              
                                date,
                                hour,
                                state:appointmentStatus
                            }),
                        });
                        
                        const data = await response.json();
                        console.log('CUI:',idCita , 'date:', date, 'hour:', hour);

                        if (data.exito) {
                            notifySuccess(data.message);
                            onClose();
                            setTimeout(() => {
                                window.location.reload();
                            }, 200);
                        } else {
                            notifyError(data.message);
                        }
                       
                    } catch (error) {
                        notifyError('Error al generar la receta');
                    }
            
                   
                };
   
    
                return (
                    <>
                        <Transition show={isOpen}>
                            <Dialog className="relative z-10 " onClose={onClose}>
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
                                            <DialogPanel className=" bg-blue-200 relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg p-6">
                                                <h1 className="text-2xl font-bold text-center mb-4">Modificar Cita para el paciente</h1>
                                                
                                                <form onSubmit={CitaSubmit}>
                                                        <div className="mb-4">
                                                        <h3 className="block text-center font-medium text-gray-700 mb-2 cent">{nom}</h3>
                                                      
                                                    </div>
            
                                                    {/* date */}
                                                    <div className="mb-4">
                                                        <label className="block text-sm font-medium text-gray-700">date</label>
                                                        <Input
                                                            type="date"
                                                            name="date"
                                                            value={date}
                                                            onChange={onInputChange}
                                                        />
                                                    </div>
            
                                                   
                                                    <div className="mb-4">
                                                        <label className="block text-sm font-medium text-gray-700">hour de la cita</label>
                                                        <Input
                                                            type="time"
                                                            name="hour"
                                                            value={hour}
                                                            onChange={onInputChange}
                                                        />
                                                    </div>
                                                    <div className="mb-4">
                                                    <label className="block text-sm font-medium text-gray-700">Estado de la cita</label>
                                                    <select
                                                        value={appointmentStatus}  // El valor por defecto será el estado inicial o 'Pendiente'
                                                        onChange={handleStatusChange}
                                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                                                    >
                                                        <option value="Pendiente">Pendiente</option>
                                                        <option value="Completada">Completada</option>
                                                    </select>
                                                    </div>
                                                  
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            type="submit"
                                                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                                        >
                                                            Reservar
                                                        </button>
                                                    
                                                        <button
                                                            type="button"
                                                            className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
                                                            onClick={onClose}
                                                        >
                                                            Cancelar
                                                        </button>
                                                    </div>
                                                </form>
            
                                                
                                            </DialogPanel>
                                        </TransitionChild>
                                    </div>
                                </div>
                                <ToastContainer position="bottom-right" autoClose={3000} pauseOnHover theme="colored" />

                            </Dialog>
                        </Transition>
                    </>
                );
            }