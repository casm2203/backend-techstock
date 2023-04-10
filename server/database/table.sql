-- Crear database
CREATE DATABASE `techstock`
/*!40100 COLLATE 'utf8mb4_spanish_ci' */
;
-- Crear tabla Usuarios
CREATE TABLE usuarios (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(200) NOT NULL,
    email VARCHAR(300) NOT NULL,
    password VARCHAR(300) NOT NULL,
    deleted BOOLEAN DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
-- Crear tabla Categorías
CREATE TABLE categorias (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255),
    deleted BOOLEAN DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);
-- Crear tabla Productos
CREATE TABLE productos (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255),
    precio INT NOT NULL,
    cantidad INT NOT NULL,
    categoria_id INT NOT NULL,
    deleted BOOLEAN DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE CASCADE
);

-- Usuarios de prueba password 123456
INSERT INTO usuarios (nombre, email, password)
VALUES
    ('Usuario 2', 'usuario2@example.com', '$2a$10$ljOvJWbBA.BLvAMbJ05lS../3OqrVlC9AYJDElR2eAvteM6O6UkFq'),
    ('Usuario 3', 'usuario3@example.com', '$2a$10$ljOvJWbBA.BLvAMbJ05lS../3OqrVlC9AYJDElR2eAvteM6O6UkFq'),
    ('Usuario 4', 'usuario4@example.com', '$2a$10$ljOvJWbBA.BLvAMbJ05lS../3OqrVlC9AYJDElR2eAvteM6O6UkFq'),
    ('Usuario 5', 'usuario5@example.com', '$2a$10$ljOvJWbBA.BLvAMbJ05lS../3OqrVlC9AYJDElR2eAvteM6O6UkFq');

--Categorias de prueba
INSERT INTO categorias (nombre, descripcion) VALUES 
('Papelería para oficina', 'Productos de papelería y suministros para oficina'),
('Electrónica', 'Productos electrónicos para el hogar y el entretenimiento'),
('Hogar', 'Artículos para el hogar y la decoración'),
('Moda', 'Ropa y accesorios de moda para todas las edades'),
('Deportes', 'Equipos y accesorios para deportes'),
('Mascotas', 'Productos para el cuidado y alimentación de mascotas');
--Productos de prueba
INSERT INTO productos (nombre, descripcion, precio, cantidad, categoria_id) VALUES
('Cuaderno universitario', 'Cuaderno tamaño carta de 100 hojas', 30000, 50, 1),
('Lápices de colores', 'Juego de 12 lápices de colores', 50000, 20, 1),
('Agenda diaria', 'Agenda para llevar un registro diario', 40000, 30, 1),
('Bolígrafo de tinta gel', 'Bolígrafo con tinta gel de color negro', 5000, 100, 1),
('Marcadores fluorescentes', 'Juego de 6 marcadores de diferentes colores', 8000, 30, 1),
('Calculadora científica', 'Calculadora con funciones científicas', 100000, 10, 1),
('Papel de colores', 'Paquete de 100 hojas de papel de colores surtidos', 15000, 40, 1),
('Grapadora metálica', 'Grapadora metálica de uso rudo', 21000, 15, 1),
('Resaltador de texto', 'Resaltador de color amarillo', 4000, 200, 1),
('Libreta de apuntes', 'Libreta tamaño media carta de 80 hojas', 18000, 50, 1),
('Smart TV', 'Televisor inteligente con pantalla de 55 pulgadas', 600000, 10, 2),
('Zapatos deportivos', 'Zapatos para correr con suela de gel', 350000, 20, 5),
('Trapero', 'Trapero de microfibra', 20000, 5, 3),
('Raqueta de tenis', 'Raqueta profesional de tenis', 550000, 15, 5),
('Comedero automático para mascotas', 'Comedero programable para perros y gatos', 250000, 50, 6),
('Auriculares inalámbricos', 'Auriculares inalámbricos con cancelación de ruido', 80000, 10, 2),
('Freidora de aire', 'Freidora Imusa de 4.1L', 350000, 10, 3),
('Set de utensilios de cocina', 'Set de 10 utensilios de cocina de acero inoxidable', 125000, 20, 3),
('Balón de fútbol', 'Balón oficial de la FIFA', 100000, 30, 5),
('Cama para mascotas', 'Cama ortopédica para perros y gatos', 200000, 25, 56;
;