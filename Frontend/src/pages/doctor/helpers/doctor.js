const api = 'http://localhost:3000/MediCare';

export const getCitasPendientesDr = async (idDoctor) => {
    try {
        const response = await fetch(api+'/citas-pendientes/'+idDoctor);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // console.log(data);
        return data;
    } catch (e) {
        return {
            exito: false,
            e
        }
    }
};

export const updateAtenderCita = async (idCita) => {
    try {
        const response = await fetch(api+'/cita/atender/'+idCita, {
            method: 'PUT', // o 'PATCH' según tu API
            headers: {
              'Content-Type': 'application/json'
            }
    });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // console.log(data);
        return data;
    } catch (e) {
        return {
            exito: false,
            e
        }
    }
};

export const updateCancelarCita = async (idCita, datos) => {
    try {
        const response = await fetch(api+'/cita/cancelar/'+idCita, {
            method: 'PUT', // o 'PATCH' según tu API
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
    });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // console.log(data);
        return data;
    } catch (e) {
        return {
            exito: false,
            e
        }
    }
};

export const updateHorarioAtencion = async (idDoctor, horarios) => {
    try {
        const response = await fetch(api+'/actualizarHorario/'+idDoctor, {
            method: 'PUT', // o 'PATCH' según tu API
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(horarios)
    });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // console.log(data);
        return data;
    } catch (e) {
        return {
            exito: false,
            e
        }
    }
};

export const getHorarioAtencion = async (idDoctor) => {
    try {
        const response = await fetch(api+'/horario/'+idDoctor);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (e) {
        return {
            exito: false,
            e
        }
    }
};

export const getHistorial = async (idDoctor) => {
    try {
        const response = await fetch(api+'/historialCitas/'+idDoctor);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (e) {
        return {
            exito: false,
            e
        }
    }
};

export const getDoctorProfile = async (idDoctor) => {
    try {
        const response = await fetch(api+'/perfil/'+idDoctor);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (e) {
        return {
            exito: false,
            e
        }
    }
};

export const putDoctorProfile = async (idDoctor, datosDoctor) => {
    try {
        const response = await fetch(api+'/perfil/'+idDoctor, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosDoctor)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (e) {
        return {
            exito: false,
            e
        }
    }
};