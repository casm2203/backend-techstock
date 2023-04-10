import { pool } from "../database/db.js";

//Obtener todos los productos
export const getProductos = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM productos Where deleted = 0 ORDER BY created_at ASC"
    );

    res.json({ result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Obtener un Producto
export const getProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query(
      `SELECT * FROM productos WHERE id = ${id} ORDER BY created_at ASC`
    );
    if (result.length === 0)
      return res.status(404).json({ Error: "Producto no encontrado" });
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Crear un Producto
export const addProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio, cantidad, categoria } = req.body;

    const [result] = await pool.query(
      "INSERT INTO productos(nombre, descripcion) VALUES (?,?,?,?,?)",
      [nombre, descripcion, precio, cantidad, categoria]
    );

    res.status(200).json({ id: result.insertId, body: req.body });
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

//Elimina un Producto
export const deleteProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query(
      "UPDATE productos SET deleted = ? WHERE id = ?",
      [1, id]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ Error: "Producto no encontrado" });
    }
    res.status(200).json({ ok: "Se ha eliminado el Producto", id });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//liberar un Producto
export const releaseProducto = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      "UPDATE productos SET deleted = ? WHERE id = ?",
      [0, id]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ Error: "Producto no encontrado" });
    }
    res.status(200).json({ ok: "Se ha liberado el Producto", id });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
