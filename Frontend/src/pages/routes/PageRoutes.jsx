import { Route, Routes } from 'react-router-dom';
import Navbar from '../../ui/components/Navbar';


import { SchedulesPageUser, HomePage, AppointmentsRecordPage, RegisterPacient, EditarPaciente } from '../paciente';

const navigationPatient = [
  { name: 'Principal', href: '/home-page', current: false },
  { name: 'Crear Paciente', href: '/register-pacient', current: false },  
  { name: 'xxxxx', href: '/appointment-list', current: false },
  { name: 'Ver citas', href: '/appointment-list', current: false },
<<<<<<< HEAD
  { name: 'xxxxx', href: '/historial-citas', current: false },
  { name: 'Expediente', href: '/', current: false },
  { name: 'Crear cita', href: '/Crear-schedule', current: false },
=======
  { name: 'xxxx', href: '/profile-patient', current: false },
>>>>>>> feature/202113293
];

const PageRoutesComponent = () => {
  return (
    <>
      <Navbar navigation={navigationPatient} editRoute={'profile-patient'} />
      <Routes>
      <Route path="home-page" element={<HomePage />} />
        <Route path="appointment-list" element={<AppointmentsRecordPage />} />
        <Route path="schedule-appointment/:idDoctor" element={<SchedulesPageUser />} />
        <Route path="register-pacient" element={<RegisterPacient />} />
        <Route path="editar-paciente/:pacienteId" element={<EditarPaciente/>} />
       
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
};

export const PageRoutes = PageRoutesComponent;
