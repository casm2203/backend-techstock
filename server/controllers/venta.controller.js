import { pool } from "../database/db.js";

//Obtener todos los ventas
export const getVentas = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM ventas ORDER BY created_at ASC"
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
    const { total, productos } = req.body;

    const [result] = await pool.query(
      "INSERT INTO ventas (total_venta) VALUES (?)",
      [total]
    );

    let idVenta = result.insertId;

    for await (const producto of productos) {
      const { id, cantidad } = producto;

      // Insertar detalle de venta
      const [detalleVenta] = await pool.query(
        "INSERT INTO detalle_venta(venta_id, producto_id, cantidad) VALUES (?,?,?)",
        [idVenta, id, cantidad]
      );

      // Actualizar cantidad del producto en la tabla de productos
      const [actualizarProducto] = await pool.query(
        "UPDATE productos SET cantidad = cantidad - ? WHERE id = ?",
        [cantidad, id]
      );
    }

    res.status(200).json({ idVenta, message: "Venta registrada con exito." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Actualizar un Producto
export const updateProducto = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query("UPDATE productos SET ? WHERE id = ?", [
      req.body,
      id,
    ]);

    res.status(200).json({ ok: "Se ha Actualizado el Producto", id, result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
