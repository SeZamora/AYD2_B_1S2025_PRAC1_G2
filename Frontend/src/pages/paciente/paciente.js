const api = 'http://localhost:3000/MediCare';

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

export const CreatePaciente = async (data) => {
    try {
        const response = await fetch(api+'/paciente', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
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
}