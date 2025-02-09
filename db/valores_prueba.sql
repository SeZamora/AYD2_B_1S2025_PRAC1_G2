-- Insertar pacientes
INSERT INTO `ayd2_practica1`.`paciente` (`nombre`, `apellido`, `cui`, `telefono`, `correo`, `edad`, `genero`, `fecha_ingreso`) VALUES
('Juan', 'Pérez', '123456789012345', '5551234567', 'juan.perez@email.com', 30, 'Masculino', '2024-01-10'),
('María', 'Gómez', '987654321098765', '5559876543', 'maria.gomez@email.com', 25, 'Femenino', '2024-02-15'),
('Carlos', 'Ramírez', '456789123045678', '5556789123', 'carlos.ramirez@email.com', 40, 'Masculino', '2024-03-20');

-- Insertar citas
INSERT INTO `ayd2_practica1`.`citas` (`paciente_id`, `fecha`, `hora`, `estado`) VALUES
(1, '2024-09-10', '10:00:00', 'Pendiente'),
(2, '2024-09-11', '14:30:00', 'Completada'),
(3, '2024-09-12', '09:15:00', 'Pendiente');

-- Insertar expedientes
INSERT INTO `ayd2_practica1`.`expediente` (`paciente_id`, `fecha`, `diagnostico`, `tratamiento`) VALUES
(1, '2024-09-10', 'Gripe común', 'Reposo e hidratación'),
(2, '2024-09-11', 'Dolor de cabeza severo', 'Paracetamol 500mg cada 8 horas'),
(3, '2024-09-12', 'Infección respiratoria', 'Antibióticos y descanso');

-- Insertar recetas
INSERT INTO `ayd2_practica1`.`recetas` (`expediente_id`, `medicamento`, `dosis`, `indicaciones`, `firma_digital`) VALUES
(1, 'Ibuprofeno', '200mg cada 8 horas', 'Tomar con alimentos', NULL),
(2, 'Paracetamol', '500mg cada 8 horas', 'No exceder la dosis recomendada', NULL),
(3, 'Amoxicilina', '500mg cada 12 horas', 'Completar el tratamiento de 7 días', NULL);
