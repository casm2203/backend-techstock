import { pool } from "../database/db.js";
import bcryptjs from "bcryptjs";
import moment from "moment";

//Obtener todos los usuarios
export const getUsers = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM usuarios Where deleted = 0 ORDER BY created_at ASC"
    );

    res.json({ result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Obtener un usuario
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query(
      `SELECT * FROM usuarios WHERE id = ${id} ORDER BY created_at ASC`
    );
    if (result.length === 0)
      return res.status(404).json({ Error: "Usuario no encontrado" });
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Crear un usuario
export const addUser = async (req, res) => {
  try {
    const { nombre, email, password, repassword } = req.body;
    const fechaColombia = moment().format("YYYY-MM-DD HH:mm:ss");
    if (password !== repassword) {
      return res.status(403).json({
        error: "Contraseña incorrecta",
        password: password,
        repassword: repassword,
      });
    }
    //Encriptar contraseña
    const salt = await bcryptjs.genSalt(10);
    let passwordEncrypted = await bcryptjs.hash(password, salt);

    const [result] = await pool.query(
      "INSERT INTO usuarios(nombre, email, password, created_at) VALUES (?,?,?,?)",
      [nombre, email, passwordEncrypted, fechaColombia]
    );

    res.status(200).json({ id: result.insertId, body: req.body });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Actualizar un usuario
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      "UPDATE usuarios SET ?, updated_at = ? WHERE id = ?",
      [req.body, fechaColombia, id]
    );

    res.status(200).json({ ok: "Se ha Actualizado el usuario", id, result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Elimina un usuario
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const fechaColombia = moment().format("YYYY-MM-DD HH:mm:ss");
    const [result] = await pool.query(
      "UPDATE usuarios SET deleted = ?, updated_at = ? WHERE id = ?",
      [1, fechaColombia, id]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ Error: "Usuario no encontrado" });
    }
    res.status(200).json({ ok: "Se ha eliminado el usuario", id });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//liberar un usuario
export const releaseUser = async (req, res) => {
  try {
    const { id } = req.params;
    const fechaColombia = moment().format("YYYY-MM-DD HH:mm:ss");
    const [result] = await pool.query(
      "UPDATE usuarios SET deleted = ?, updated_at = ? WHERE id = ?",
      [0, fechaColombia, id]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ Error: "Usuario no encontrado" });
    }
    res.status(200).json({ ok: "Se ha liberado el usuario", id });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
