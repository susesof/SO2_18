CREATE DATABASE p1_18;
USE p1_18;

CREATE TABLE procesos (
  id_proceso INT AUTO_INCREMENT PRIMARY KEY,
  pid INT,
  nombre VARCHAR(255),
  llamada VARCHAR(50),
  tamano INT,
  fecha DATETIME
);

SELECT * FROM procesos