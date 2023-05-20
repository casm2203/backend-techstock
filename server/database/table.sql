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
    url_img VARCHAR(255) NOT NULL,
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

-- Crear tabla venta
CREATE TABLE ventas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  total_venta INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla detalle venta
CREATE TABLE detalle_venta (
  id INT AUTO_INCREMENT PRIMARY KEY,
  venta_id INT NOT NULL,
  cantidad INT NOT NULL,
  producto_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (venta_id) REFERENCES ventas(id),
  FOREIGN KEY (producto_id) REFERENCES productos(id)
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
INSERT INTO productos (nombre,url_img, descripcion, precio, cantidad, categoria_id) VALUES
('Cuaderno universitario', 'https://howtodrawforkids.com/wp-content/uploads/2022/07/how-to-draw-an-open-book.jpg', 'Cuaderno tamaño carta de 100 hojas', 30000, 50, 1),
('Lápices de colores', 'https://howtodrawforkids.com/wp-content/uploads/2022/07/how-to-draw-an-open-book.jpg', 'Juego de 12 lápices de colores', 50000, 20, 1),
('Agenda diaria', 'https://howtodrawforkids.com/wp-content/uploads/2022/07/how-to-draw-an-open-book.jpg', 'Agenda para llevar un registro diario', 40000, 30, 1),
('Bolígrafo de tinta gel', 'https://howtodrawforkids.com/wp-content/uploads/2022/07/how-to-draw-an-open-book.jpg', 'Bolígrafo con tinta gel de color negro', 5000, 100, 1),
('Marcadores fluorescentes', 'https://howtodrawforkids.com/wp-content/uploads/2022/07/how-to-draw-an-open-book.jpg', 'Juego de 6 marcadores de diferentes colores', 8000, 30, 1),
('Calculadora científica', 'https://howtodrawforkids.com/wp-content/uploads/2022/07/how-to-draw-an-open-book.jpg', 'Calculadora con funciones científicas', 100000, 10, 1),
('Papel de colores','https://howtodrawforkids.com/wp-content/uploads/2022/07/how-to-draw-an-open-book.jpg', 'Paquete de 100 hojas de papel de colores surtidos', 15000, 40, 1),
('Grapadora metálica','https://howtodrawforkids.com/wp-content/uploads/2022/07/how-to-draw-an-open-book.jpg', 'Grapadora metálica de uso rudo', 21000, 15, 1),
('Resaltador de texto','https://howtodrawforkids.com/wp-content/uploads/2022/07/how-to-draw-an-open-book.jpg', 'Resaltador de color amarillo', 4000, 200, 1),
('Libreta de apuntes','https://howtodrawforkids.com/wp-content/uploads/2022/07/how-to-draw-an-open-book.jpg', 'Libreta tamaño media carta de 80 hojas', 18000, 50, 1),
('Smart TV','https://howtodrawforkids.com/wp-content/uploads/2022/07/how-to-draw-an-open-book.jpg', 'Televisor inteligente con pantalla de 55 pulgadas', 600000, 10, 2),
('Zapatos deportivos','https://howtodrawforkids.com/wp-content/uploads/2022/07/how-to-draw-an-open-book.jpg', 'Zapatos para correr con suela de gel', 350000, 20, 5),
('Trapero','https://howtodrawforkids.com/wp-content/uploads/2022/07/how-to-draw-an-open-book.jpg', 'Trapero de microfibra', 20000, 5, 3),
('Raqueta de tenis','https://howtodrawforkids.com/wp-content/uploads/2022/07/how-to-draw-an-open-book.jpg', 'Raqueta profesional de tenis', 550000, 15, 5),
('Comedero automático para mascotas','https://howtodrawforkids.com/wp-content/uploads/2022/07/how-to-draw-an-open-book.jpg', 'Comedero programable para perros y gatos', 250000, 50, 6),
('Auriculares inalámbricos','https://howtodrawforkids.com/wp-content/uploads/2022/07/how-to-draw-an-open-book.jpg', 'Auriculares inalámbricos con cancelación de ruido', 80000, 10, 2),
('Freidora de aire','https://howtodrawforkids.com/wp-content/uploads/2022/07/how-to-draw-an-open-book.jpg', 'Freidora Imusa de 4.1L', 350000, 10, 3),
('Set de utensilios de cocina','https://howtodrawforkids.com/wp-content/uploads/2022/07/how-to-draw-an-open-book.jpg', 'Set de 10 utensilios de cocina de acero inoxidable', 125000, 20, 3),
('Balón de fútbol','https://howtodrawforkids.com/wp-content/uploads/2022/07/how-to-draw-an-open-book.jpg', 'Balón oficial de la FIFA', 100000, 30, 5);

-- Insertar datos en la tabla "ventas"
INSERT INTO ventas (created_at, total) VALUES ('2023-05-17 10:30:00', 50000);
INSERT INTO ventas (created_at, total) VALUES ('2023-05-16 15:45:00', 70000);

-- Insertar datos en la tabla "detalle_venta"
INSERT INTO detalle_venta (venta_id, cantidad, producto_id, fecha) VALUES (1, 3, 1, '2023-05-17 10:30:00');
INSERT INTO detalle_venta (venta_id, cantidad, producto_id, fecha) VALUES (1, 2, 2, '2023-05-17 10:30:00');
INSERT INTO detalle_venta (venta_id, cantidad, producto_id, fecha) VALUES (1, 7, 3, '2023-05-17 10:30:00');
INSERT INTO detalle_venta (venta_id, cantidad, producto_id, fecha) VALUES (1, 3, 4, '2023-05-17 10:30:00');
INSERT INTO detalle_venta (venta_id, cantidad, producto_id, fecha) VALUES (1, 4, 5, '2023-05-17 10:30:00');
INSERT INTO detalle_venta (venta_id, cantidad, producto_id, fecha) VALUES (2, 3, 6, '2023-05-16 15:45:00');
INSERT INTO detalle_venta (venta_id, cantidad, producto_id, fecha) VALUES (2, 2, 5, '2023-05-16 15:45:00');
INSERT INTO detalle_venta (venta_id, cantidad, producto_id, fecha) VALUES (2, 1, 9, '2023-05-16 15:45:00');
INSERT INTO detalle_venta (venta_id, cantidad, producto_id, fecha) VALUES (2, 6, 8, '2023-05-16 15:45:00');