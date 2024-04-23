CREATE DATABASE p1_18;
USE p1_18;

-- Crear la tabla Proceso
CREATE TABLE Proceso (
  pid INT PRIMARY KEY,
  nombre VARCHAR(255),
  tamano INT
);

-- Crear la tabla solicitudes
CREATE TABLE solicitudes (
  id_solicitudes INT AUTO_INCREMENT PRIMARY KEY,
  pid INT,
  nombre VARCHAR(255),
  llamada VARCHAR(50),
  tamano INT,
  fecha DATETIME,
  FOREIGN KEY (pid) REFERENCES Proceso(pid)
);




SELECT * FROM Proceso

