CREATE TABLE IF NOT EXISTS roles (
    id_rol INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS especialidades (
    id_especialidad INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    nombre VARCHAR(150) NOT NULL
);

CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nombre VARCHAR(150) NOT NULL,
    apellido VARCHAR(150) NOT NULL,
    genero VARCHAR(100) NOT NULL,
    email VARCHAR(250) NOT NULL UNIQUE,
    pass VARCHAR(500) NOT NULL,
    direccion VARCHAR(500),
    fecha_nacimiento DATE,
    foto VARCHAR(500),
    id_especialidad INTEGER,
    id_rol INTEGER NOT NULL,
    FOREIGN KEY (id_especialidad) REFERENCES especialidades(id_especialidad),
    FOREIGN KEY (id_rol) REFERENCES roles(id_rol)
);

CREATE TABLE IF NOT EXISTS horarios (
    id_horario INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    dia ENUM('lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo') NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    id_medico INTEGER NOT NULL,
    FOREIGN KEY (id_medico) REFERENCES usuarios(id_usuario),
    UNIQUE (id_medico, dia)
);

CREATE TABLE IF NOT EXISTS citas (
    id_cita INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    motivo TEXT NOT NULL,
    estado ENUM('pendiente', 'atendido', 'cancelado_paciente', 'cancelado_medico') NOT NULL,
    id_paciente INTEGER NOT NULL,
    id_medico INTEGER NOT NULL,
    FOREIGN KEY (id_paciente) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_medico) REFERENCES usuarios(id_usuario)
);

INSERT INTO roles (nombre) VALUES
('Paciente'),
('Medico');

INSERT INTO especialidades (nombre) VALUES
('Cardiología'),
('Dermatología'),
('Pediatría'),
('Neurología'),
('Ginecología'),
('Oftalmología');

INSERT INTO usuarios (nombre, apellido, genero, email, pass, direccion, fecha_nacimiento, foto, id_especialidad, id_rol) VALUES
('Ana', 'García', 'F', 'ana.garcia@ejemplo.com', SHA2('Password123', 256), '123 Calle Salud', NULL, 'ana.jpg', 1, 2),
('Carlos', 'Pérez', 'M', 'carlos.perez@ejemplo.com', SHA2('Password123', 256), '456 Avenida Médica', NULL, 'carlos.jpg', 2, 2),
('Laura', 'López', 'F', 'laura.lopez@ejemplo.com', SHA2('Password123', 256), '789 Calle Doctor', NULL, 'laura.jpg', 3, 2),
('Miguel', 'Torres', 'M', 'miguel.torres@ejemplo.com', SHA2('Password123', 256), '101 Calle Clínica', NULL, 'miguel.jpg', 4, 2),
('Elena', 'Martínez', 'F', 'elena.martinez@ejemplo.com', SHA2('Password123', 256), '202 Avenida Salud', NULL, 'elena.jpg', 5, 2),
('José', 'Fernández', 'M', 'jose.fernandez@ejemplo.com', SHA2('Password123', 256), '303 Avenida Médica', NULL, 'jose.jpg', 6, 2),
('Juan', 'Pérez', 'M', 'juan.perez@ejemplo.com', SHA2('Password123', 256), 'Calle Falsa 123', '1990-01-01', 'juan.jpg', NULL, 1),
('María', 'López', 'F', 'maria.lopez@ejemplo.com', SHA2('Password123', 256), 'Avenida Siempreviva 456', '1985-02-15', 'maria.jpg', NULL, 1),
('Pedro', 'García', 'M', 'pedro.garcia@ejemplo.com', SHA2('Password123', 256), 'Calle Verdadera 789', '1978-07-22', 'pedro.jpg', NULL, 1),
('Lucía', 'Martínez', 'F', 'lucia.martinez@ejemplo.com', SHA2('Password123', 256), 'Calle Luz 101', '1995-11-30', 'lucia.jpg', NULL, 1),
('Andrés', 'Torres', 'M', 'andres.torres@ejemplo.com', SHA2('Password123', 256), 'Avenida Libertad 202', '2000-05-10', 'andres.jpg', NULL, 1);

INSERT INTO horarios (id_medico, dia, hora_inicio, hora_fin) VALUES
(1, 'lunes', '08:00:00', '16:00:00'),
(1, 'martes', '08:00:00', '16:00:00'),
(1, 'miércoles', '08:00:00', '16:00:00'),
(1, 'jueves', '08:00:00', '16:00:00'),
(1, 'viernes', '08:00:00', '16:00:00'),
(2, 'lunes', '09:00:00', '17:00:00'),
(2, 'miércoles', '09:00:00', '17:00:00'),
(2, 'viernes', '09:00:00', '17:00:00'),
(3, 'martes', '10:00:00', '18:00:00'),
(3, 'jueves', '10:00:00', '18:00:00'),
(4, 'lunes', '07:00:00', '15:00:00'),
(4, 'miércoles', '07:00:00', '15:00:00'),
(4, 'viernes', '07:00:00', '15:00:00'),
(5, 'martes', '08:00:00', '16:00:00'),
(5, 'jueves', '08:00:00', '16:00:00'),
(6, 'lunes', '11:00:00', '19:00:00'),
(6, 'jueves', '11:00:00', '19:00:00');

INSERT INTO citas (fecha, hora, motivo, estado, id_paciente, id_medico) VALUES
('2024-06-14', '08:30:00', 'Consulta de revisión', 'pendiente', 7, 1),
('2024-06-14', '10:00:00', 'Dolor de cabeza persistente', 'pendiente', 8, 2),
('2024-06-15', '09:00:00', 'Chequeo anual', 'pendiente', 9, 3),
('2024-06-15', '11:30:00', 'Revisión de presión arterial', 'pendiente', 10, 4),
('2024-06-16', '13:00:00', 'Consulta de oftalmología', 'pendiente', 11, 5),
('2024-06-16', '15:30:00', 'Problema de visión', 'pendiente', 7, 6),
('2024-06-17', '08:30:00', 'Consulta de dermatología', 'pendiente', 8, 1),
('2024-06-17', '10:00:00', 'Revisión de lunares', 'pendiente', 9, 2),
('2024-06-18', '09:00:00', 'Dolor en el pecho', 'pendiente', 10, 3),
('2024-06-18', '11:30:00', 'Chequeo neurológico', 'pendiente', 11, 4);
