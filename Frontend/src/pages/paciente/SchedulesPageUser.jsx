import { Card } from '../../ui/components/Card'
import { Input } from '../../ui/components/Input';
import { Label } from '../../ui/components/Label';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ModalCita from '../../ui/components/ModalCita';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const SchedulesPageUser = () => {
    const { idDoctor } = useParams();
    const [fecha, setFecha] = useState('');
    const [modalData, setModalData] = useState({ isOpen: false, hora: '', fecha: '', doctorId: '' });
    const [horarios, setHorarios] = useState([]);
    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/MediCare/schedule/${idDoctor}`)
            .then((response) => response.json())
            .then((data) => {
                setHorarios(data);
            });
    }, [idDoctor]);

    const handleReserveClick = (hora, fecha, dia) => {
        setModalData({ isOpen: true, hora, fecha, doctorId: idDoctor, dia});
    }

    const handleHorario = async () => {
        console.log('Fecha seleccionada:', fecha, 'Doctor seleccionado:', idDoctor);
        try {
            const response = await fetch(`http://localhost:3000/MediCare/schedule/${idDoctor}/${fecha}`);
            if (response.status === 404) {
                toast.error('No se encontraron horarios disponibles para la fecha seleccionada.');
                setSchedules([]);
            } else {
                const data = await response.json();
                setSchedules(data);
            }
        } catch (error) {
            console.error('Error fetching schedule:', error);
            toast.error('Hubo un problema al obtener los horarios. Por favor, intenta nuevamente más tarde.');
        }
    }

    return (
        <div className="grid grid-cols-3 p-4 gap-4">
            <ToastContainer />
            <div className="col-span-3">
                <Card>
                    <div className='grid grid-cols-3 p-4 gap-4'>
                        <div className='col-span-3'>
                            <h1 className="text-2xl font-bold text-center">Horario de Atención del Doctor {/* Nombre del doctor */}</h1>
                            <div className='grid grid-cols-3 p-4 gap-4'>
                                <div className='col-span-1 col-start-2'>
                                    <table className="bg-bg-300 w-full col-span-5 text-sm text-center rtl:text-right text-text200 ">
                                        <thead className="bg-bg-200 text-xs text-text100 uppercase">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">Día</th>
                                                <th scope="col" className="px-6 py-3">Hora Inicio</th>
                                                <th scope="col" className="px-6 py-3">Hora Fin</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-bg-300">
                                            {horarios.map((horario, index) => (
                                                <tr key={index}>
                                                    <td className="px-6 py-4 whitespace-nowrap">{horario.dia}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{horario.hora_inicio}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{horario.hora_fin}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className='col-span-1 col-start-2'>
                            <form>
                                <Label>Fecha</Label>
                                <Input
                                    type="date"
                                    name="fecha"
                                    value={fecha}
                                    onChange={(e) => setFecha(e.target.value)}
                                />
                            </form>
                            <br />
                            <button onClick={handleHorario} className="bg-primary-100 rounded-md w-full h-10 disabled:bg-primary-300 text-text-100 font-bold">
                                Consultar disponibilidad de Horarios
                            </button>
                        </div>
                        {schedules.map((schedule, scheduleIndex) => (
                            <div key={scheduleIndex} className='col-span-3'>
                                <h1 className="text-2xl font-bold text-center">Horarios Disponibles</h1>
                                <table className="bg-bg-300 w-full col-span-5 text-sm text-center rtl:text-right text-text200 ">
                                    <thead className="bg-bg-200 text-xs text-text100 uppercase">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">Día</th>
                                            <th scope="col" className="px-6 py-3">Hora</th>
                                            <th scope="col" className="px-6 py-3">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-bg-300">
                                        {schedule.disponible.map((hora, index) => (
                                            <tr key={`${scheduleIndex}-disponible-${index}`}>
                                                <td className="px-6 py-4 whitespace-nowrap">{schedule.dia}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{hora}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <button
                                                        onClick={() => handleReserveClick(hora, fecha, schedule.dia)}
                                                        className="bg-primary-100 rounded-md w-full h-10 text-text-100 font-bold">
                                                        Reservar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <h1 className="text-2xl font-bold text-center">Horarios Ocupados</h1>
                                <table className="bg-bg-300 w-full col-span-5 text-sm text-center rtl:text-right text-text200 ">
                                    <thead className="bg-bg-200 text-xs text-text100 uppercase">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">Día</th>
                                            <th scope="col" className="px-6 py-3">Hora</th>
                                            <th scope="col" className="px-6 py-3">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-bg-300">
                                        {schedule.ocupado.map((hora, index) => (
                                            <tr key={`${scheduleIndex}-ocupado-${index}`}>
                                                <td className="px-6 py-4 whitespace-nowrap">{schedule.dia}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{hora}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <button
                                                        onClick={() => handleReserveClick(hora, fecha)}
                                                        className="bg-primary-100 rounded-md w-full h-10 text-text-100 font-bold">
                                                        Reservar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </div>
                </Card>
            </div >
            {
                modalData.isOpen && (
                    <ModalCita
                        isOpen={modalData.isOpen}
                        onClose={() => setModalData({ ...modalData, isOpen: false })}
                        doctorId={modalData.doctorId}
                        hora={modalData.hora}
                        fecha={modalData.fecha}
                        dia={modalData.dia}
                    />
                )
            }
        </div >
    );
};
