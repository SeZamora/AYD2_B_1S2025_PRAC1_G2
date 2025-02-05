-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema ayd2_practica1
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema ayd2_practica1
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ayd2_practica1` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `ayd2_practica1` ;

-- -----------------------------------------------------
-- Table `ayd2_practica1`.`pacientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ayd2_practica1`.`pacientes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL,
  `apellido` VARCHAR(50) NOT NULL,
  `cui` VARCHAR(20) NOT NULL,
  `telefono` VARCHAR(15) NOT NULL,
  `correo` VARCHAR(100) NOT NULL,
  `edad` INT NOT NULL,
  `genero` ENUM('Masculino', 'Femenino', 'Otro') NOT NULL,
  `fecha_ingreso` DATE NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `cui` (`cui` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ayd2_practica1`.`doctores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ayd2_practica1`.`doctores` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL,
  `apellido` VARCHAR(50) NOT NULL,
  `especialidad` VARCHAR(100) NOT NULL,
  `telefono` VARCHAR(15) NOT NULL,
  `correo` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `correo` (`correo` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ayd2_practica1`.`citas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ayd2_practica1`.`citas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `paciente_id` INT NOT NULL,
  `doctor_id` INT NOT NULL,
  `fecha` DATE NOT NULL,
  `hora` TIME NOT NULL,
  `estado` ENUM('Pendiente', 'Completada', 'Cancelada') NULL DEFAULT 'Pendiente',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `doctor_id` (`doctor_id` ASC, `fecha` ASC, `hora` ASC) VISIBLE,
  INDEX `paciente_id` (`paciente_id` ASC) VISIBLE,
  CONSTRAINT `citas_ibfk_1`
    FOREIGN KEY (`paciente_id`)
    REFERENCES `ayd2_practica1`.`pacientes` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `citas_ibfk_2`
    FOREIGN KEY (`doctor_id`)
    REFERENCES `ayd2_practica1`.`doctores` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ayd2_practica1`.`expedientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ayd2_practica1`.`expedientes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `paciente_id` INT NOT NULL,
  `doctor_id` INT NOT NULL,
  `fecha` DATE NOT NULL,
  `diagnostico` TEXT NOT NULL,
  `tratamiento` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `paciente_id` (`paciente_id` ASC) VISIBLE,
  INDEX `doctor_id` (`doctor_id` ASC) VISIBLE,
  CONSTRAINT `expedientes_ibfk_1`
    FOREIGN KEY (`paciente_id`)
    REFERENCES `ayd2_practica1`.`pacientes` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `expedientes_ibfk_2`
    FOREIGN KEY (`doctor_id`)
    REFERENCES `ayd2_practica1`.`doctores` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ayd2_practica1`.`recetas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ayd2_practica1`.`recetas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `expediente_id` INT NOT NULL,
  `medicamento` VARCHAR(100) NOT NULL,
  `dosis` VARCHAR(100) NOT NULL,
  `indicaciones` TEXT NOT NULL,
  `firma_digital` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `expediente_id` (`expediente_id` ASC) VISIBLE,
  CONSTRAINT `recetas_ibfk_1`
    FOREIGN KEY (`expediente_id`)
    REFERENCES `ayd2_practica1`.`expedientes` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
