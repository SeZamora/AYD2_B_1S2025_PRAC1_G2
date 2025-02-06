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