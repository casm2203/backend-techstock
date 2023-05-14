import { pool } from "../database/db.js";
import bcryptjs from "bcryptjs";
import { generateToken } from "../utils/tokenManager.js";

// iniciar sesion
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [result] = await pool.query(
      `SELECT * FROM usuarios WHERE email = '${email}' and deleted = 0`
    );

    if (result.length === 0)
      return res.status(404).json({ Error: "Usuario no encontrado" });

    const resultPassword = await bcryptjs.compare(password, result[0].password);

    if (!resultPassword)
      return res.status(403).json({
        error: "Contraseña incorrecta",
        password: password,
        bdpassword: result[0].password,
      });

    //return res.json(result);

    //Generar token

    const { token, expiresIn } = generateToken(result[0].id, res);

    res.cookie("token", token, {
      httpOnly: true,
      secure: !(process.env.MODO === "developer"),
    });
    return res.json({ token, expiresIn, user: result[0] });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ error: "500: Error en el servidor" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  return res.json({ ok: true });
};
