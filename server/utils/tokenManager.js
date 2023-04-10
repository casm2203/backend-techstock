import jwt from "jsonwebtoken";

export const generateToken = (uid, res) => {
  const expiresIn = 60 * 60 * 24 * 30;

  try {
    const token = jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn });
    
    res.cookie("token", token, {
      httpOnly: true,
      secure: !(process.env.MODO === "developer"),
      expires: new Date(Date.now() + expiresIn * 1000),
    });

    return { token, expiresIn };
  } catch (error) {
    console.log(error);
  }
};

export const tokenVerificationErrors = {
  "invalid signature": "la firma de JWT no es válida",
  "jwt expired": "JWT expirado",
  "invalid token": "Token invalido",
  "No Bearer": "Utiliza el formato Bearer",
  "jwt malformed": "El formato JWT no es valido",
};
