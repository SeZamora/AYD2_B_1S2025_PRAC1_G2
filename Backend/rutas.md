# PACIENTES
### CREAR PACIENTE
### POST http://localhost:3000/MediCare/createPatient
```json

{
  "nombre": "nombre",
  "apellido": "apellido",
  "cui": "1234567891011",
  "telefono": "12345678",
  "correo": "example@gmail.com",
  "edad": 30,
  "genero": "Femenino",
  "fecha_ingreso": "2025-02-06"
}
```
RESPONSE
```json

{
  "message": "Usuario creado",
  "exito": true
}
```

### ELIMINAR PACIENTE
### DELETE http://localhost:3000/MediCare/delete
```json

{
  "cui": "1234567891011"
}
```
RESPONSE
```json
{
  "message": "Paciente eliminado correctamente",
  "exito": true
}
```

### OBTENER TODOS LOS PACIENTES
### GET http://localhost:3000/MediCare/getAllPatients

RESPONSE
```json
{
  "exito": true,
  "pacientes": [
    {
      "id": 1,
      "nombre": "nombre",
      "apellido": "apellido",
      "cui": "1234567891011",
      "telefono": "12345678",
      "correo": "example@gmail.com",
      "edad": 30,
      "genero": "Femenino",
      "fecha_ingreso": "2025-02-06T06:00:00.000Z"
    },
    {
      "id": 3,
      "nombre": "nombre2",
      "apellido": "apellido2",
      "cui": "3010308470102",
      "telefono": "12345678",
      "correo": "example2@gmail.com",
      "edad": 30,
      "genero": "Masculino",
      "fecha_ingreso": "2025-02-06T06:00:00.000Z"
    }
  ]
}
```

### OBTENER PACIENTE POR ID O CUI
### GET http://localhost:3000/MediCare/patient/1

RESPONSE 
```json

{
  "exito": true,
  "paciente": {
    "id": 1,
    "nombre": "nombre",
    "apellido": "apellido",
    "cui": "12345678910",
    "telefono": "12345678",
    "correo": "example@gmail.com",
    "edad": 30,
    "genero": "Femenino",
    "fecha_ingreso": "2025-02-06T06:00:00.000Z"
  }
}
```


# CITAS

### AGENDAR CITA
### POST http://localhost:3000/MediCare/appointment/programed
```json
{
  "cui": "1234567891011",
  "date": "2026-02-06",
  "hour": "22:50"
}
```

RESPONSE
```json
{
  "exito": true,
  "message": "Cita programada correctamente.",
  "date": "2028-02-06",
  "hour": "22:50"
}
```


### EDITAR CITA
### PUT http://localhost:3000/MediCare/appointment/edit
```json
{
  "idCita": "1",
  "date": "2028-02-07",
  "hour": "22:50",
  "state": "Completada"
}
```

RESPONSE
```json
{
  "exito": true,
  "message": "Cita actualizada satisfactoriamente"
}
```


### ELIMINAR CITA
### DELETE http://localhost:3000/MediCare/appointment/delete
```json
{
  "idCita": "1"
}

```

RESPONSE
```json
{
  "exito": true,
  "message": "Cita eliminada exitosamente."
}
```


### OBTENER TODAS LAS CITAS
### GET http://localhost:3000/MediCare/citas

RESPONSE
```json
[
  {
    "id": 2,
    "paciente_id": 1,
    "fecha": "2026-02-06T06:00:00.000Z",
    "hora": "22:50:00",
    "estado": "Pendiente",
    "nombre_paciente": "nombre apellido",
    "cui": "1234567891011"
  },
  {
    "id": 3,
    "paciente_id": 1,
    "fecha": "2028-02-06T06:00:00.000Z",
    "hora": "22:50:00",
    "estado": "Pendiente",
    "nombre_paciente": "nombre apellido",
    "cui": "1234567891011"
  }
]
```


### OBTENER CITA POR PACIENTE
### POST http://localhost:3000/MediCare/citasPaciente
```json
{
  "cui": "1"
}

```

RESPONSE
```json
[
  {
    "id": 2,
    "paciente_id": 1,
    "fecha": "2026-02-06T06:00:00.000Z",
    "hora": "22:50:00",
    "estado": "Pendiente",
    "nombre_paciente": "nombre apellido",
    "cui": "1234567891011"
  }
]
```