import { pool } from "../database/db.js";

//Obtener todos los categorias
export const getCategorias = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM categorias Where deleted = 0 ORDER BY created_at ASC"
    );

    res.json({ result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Obtener un Categoria
export const getCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query(
      `SELECT * FROM categorias WHERE id = ${id} ORDER BY created_at ASC`
    );
    if (result.length === 0)
      return res.status(404).json({ Error: "Categoria no encontrada" });
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Crear un Categoria
export const addCategoria = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;

    const [result] = await pool.query(
      "INSERT INTO categorias(nombre, descripcion) VALUES (?,?)",
      [nombre, descripcion]
    );

    res.status(200).json({ id: result.insertId, body: req.body });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Actualizar un Categoria
export const updateCategoria = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query("UPDATE categorias SET ? WHERE id = ?", [
      req.body,
      id,
    ]);

    res.status(200).json({ ok: "Se ha Actualizado la Categoria", id, result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Elimina un Categoria
export const deleteCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query(
      "UPDATE categorias SET deleted = ? WHERE id = ?",
      [1, id]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ Error: "Categoria no encontrada" });
    }
    res.status(200).json({ ok: "Se ha eliminado la Categoria", id });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//liberar un Categoria
export const releaseCategoria = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      "UPDATE categorias SET deleted = ? WHERE id = ?",
      [0, id]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ Error: "Categoria no encontrada" });
    }
    res.status(200).json({ ok: "Se ha liberado la Categoria", id });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
