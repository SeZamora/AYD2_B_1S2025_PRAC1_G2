import Navbar from '../../ui/components/Navbar'

import { PrivateRoute } from '../../router/PrivateRoute';
import { useContext } from 'react';
import { AuthContext } from '../../auth';
import { ProtectedRoute } from '../../router/ProtectedRoute';
import { EditProfilePage as DoctorEditProfilePage, ManagementAppoinmentsPage, SchedulesPage,AppointmentsRecordPage as DoctorAppointmentsRecordPage,} from '../doctor';
import { SchedulesPageUser, EditProfilePage as PatientEditProfilePage, HomePage, AppointmentsRecordPage, HistorialCitas } from '../paciente';

const navigationPatient = [
    { name: 'Principal', href: '/home-page', current: false },
    { name: 'Lista de citas Activas', href: '/appointment-list', current: false },
    { name: 'Historial de Citas', href: '/historial-citas', current: false },
    { name: 'Perfil', href: '/profile-patient', current: false },
  ];

const navigationDoctor = [
    { name: 'Gestion de citas', href: '/appointment-management', current: false },
    { name: 'Horarios de atencion', href: '/attention-schedule', current: false },
    { name: 'Historial de citas', href: '/appointment-record-doctor', current: false },
    { name: 'Perfil', href: '/doctor-profile', current: false },
];

const PageRoutesComponent = () => {
    const { user } = useContext(AuthContext);

    return (
        <PrivateRoute>
            <Navbar 
                navigation={user?.type === 2 ? navigationDoctor : navigationPatient} 
                editRoute={user?.type === 2 ? 'profile-doctor' : 'profile-patient'} 
            />
        </PrivateRoute>
    );
}

export const PageRoutes = {


    element: <PageRoutesComponent />,
    children: [
        {
            path: "appointment-management",
            element: (
                <ProtectedRoute requiredRole={2}>
                    <ManagementAppoinmentsPage />,
                </ProtectedRoute>
            )
        },
        {
            path: "attention-schedule",
            element: (
                <ProtectedRoute requiredRole={2}>
                    <SchedulesPage />,
                </ProtectedRoute>
            )
        },
        {
            path: "appointment-record-doctor",
            element: (
                <ProtectedRoute requiredRole={2}>
                    <DoctorAppointmentsRecordPage />,
                </ProtectedRoute>
            )
        },
        {
            path: "doctor-profile",
            element: (
                <ProtectedRoute requiredRole={2}>
                    <DoctorEditProfilePage />,
                </ProtectedRoute>
            )
        },
        {
            path: "home-page",
            element: (
                <ProtectedRoute requiredRole={1}>
                    <HomePage />
                </ProtectedRoute>
            )
        },
        {
            path: "appointment-list",
            element: (
                <ProtectedRoute requiredRole={1}>
                    <AppointmentsRecordPage />
                </ProtectedRoute>
            )
        },
        {
            path: "schedule-appointment/:idDoctor",
            element: (
                <ProtectedRoute requiredRole={1}>
                    <SchedulesPageUser />
                </ProtectedRoute>
            )
        },
        {
            path: "profile-patient",
            element: (
                <ProtectedRoute requiredRole={1}>
                    <PatientEditProfilePage />,
                </ProtectedRoute>
            )
        },
        {
            path: "historial-citas",
            element: (
                <ProtectedRoute requiredRole={1}>
                    <HistorialCitas />
                </ProtectedRoute>
            )
        },
        {
            // path: "/*",
            path: "/",
            element: <ProtectedRoute requiredRole={0}/>,
        },
    ]
}