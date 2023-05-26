import { pool } from "../database/db.js";
import moment from "moment";
import "moment-timezone";

let week_from = moment()
  .tz("America/Bogota")
  .startOf("week")
  .format("YYYY-MM-DD");
let week_to = moment().tz("America/Bogota").endOf("week").format("YYYY-MM-DD");
let day_from = moment()
  .tz("America/Bogota")
  .startOf("day")
  .format("YYYY-MM-DD HH:mm:ss");
let day_to = moment()
  .tz("America/Bogota")
  .endOf("day")
  .format("YYYY-MM-DD HH:mm:ss");

//Obtener todos los ventas diarias
export const getVentasDashboardDay = async (req, res) => {
  try {
    const [result] = await pool.query(
      `SELECT DATE(created_at) AS fecha_venta, SUM(total_venta) AS total_ventas
      FROM ventas
      WHERE created_at BETWEEN '${day_from}' and '${day_to}' 
      GROUP BY DATE(created_at)`
    );

    res.json({ result: result[0], day_to, day_from });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Obtener todos los ventas semanales
export const getVentasDashboardWeek = async (req, res) => {
  try {
    const [result] = await pool.query(
      `SELECT DATE(created_at) AS fecha_venta, SUM(total_venta) AS total_ventas
      FROM ventas
      WHERE created_at BETWEEN '${week_from}' and '${week_to}' 
      GROUP BY DATE(created_at)
      ORDER BY fecha_venta asc`
    );

    res.json({ result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Buscar un Producto
export const getSearchVenta = async (req, res) => {
  try {
    const { search } = req.params;
    const [result] = await pool.query(
      `SELECT * FROM ventas WHERE nombre_cliente like '%${search}%' ORDER BY created_at ASC`
    );
    if (result.length === 0)
      return res.status(404).json({ Error: "Venta no encontrada" });
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Buscar un Producto
export const getHistoryVentas = async (req, res) => {
  try {
    const [ventasRows] = await pool.query(
      `SELECT * FROM ventas ORDER BY created_at ASC`
    );

    if (ventasRows.length === 0) {
      return res.status(404).json({ Error: "No hay ventas" });
    }

    const historialVentas = [];

    for (const ventaRow of ventasRows) {
      const venta = {
        id: ventaRow.id,
        created_at: ventaRow.created_at,
        total_venta: ventaRow.total_venta,
        detalles: [],
      };

      // Consultar los detalles de la venta desde la tabla "detalle_venta"
      const [detallesRows] = await pool.query(
        `SELECT detalle_venta.producto_id, detalle_venta.cantidad, productos.nombre, productos.url_img, productos.precio FROM detalle_venta inner join productos on productos.id = detalle_venta.producto_id WHERE venta_id = ${venta.id}`
      );

      // Agregar cada detalle de la venta al array de detalles
      for (const detalleRow of detallesRows) {
        const detalleVenta = {
          producto_id: detalleRow.producto_id,
          cantidad: detalleRow.cantidad,
          nombre: detalleRow.nombre,
          url_img: detalleRow.url_img,
          precio: detalleRow.precio,
        };

        venta.detalles.push(detalleVenta);
      }

      historialVentas.push(venta);
    }

    res.status(200).json({ historialVentas });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Obtener una Venta
export const getVenta = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query(
      `SELECT * FROM ventas WHERE id = ${id} ORDER BY created_at ASC`
    );
    if (result.length === 0)
      return res.status(404).json({ Error: "Venta no encontrada" });
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Crear una Venta
export const addVenta = async (req, res) => {
  try {
    // Configurar la zona horaria de Colombia
    const fechaColombia = moment()
      .tz("America/Bogota")
      .format("YYYY-MM-DD HH:mm:ss");

    const { total, productos } = req.body;

    const [result] = await pool.query(
      "INSERT INTO ventas (total_venta, created_at) VALUES (?,?)",
      [total, fechaColombia]
    );

    let idVenta = result.insertId;

    for await (const producto of productos) {
      const { id, cantidad } = producto;

      //Insertar detalle de venta
      const [detalleVenta] = await pool.query(
        "INSERT INTO detalle_venta(venta_id, producto_id, cantidad, created_at) VALUES (?,?,?,?)",
        [idVenta, id, cantidad, fechaColombia]
      );

      //Actualizar cantidad del producto en la tabla de productos
      const [actualizarProducto] = await pool.query(
        "UPDATE productos SET cantidad = cantidad - ?, updated_at = ? WHERE id = ?",
        [cantidad, fechaColombia, id]
      );
    }

    res.status(200).json({ idVenta, message: "Venta registrada con exito." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
