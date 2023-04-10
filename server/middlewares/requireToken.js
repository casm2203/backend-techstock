import jwt from "jsonwebtoken";
import { tokenVerificationErrors } from "../utils/tokenManager.js";

export const requireToken = (req, res, next) => {
  try {
    let token = req.headers?.authorization;

    if (!token) {
      res
        .status(401)
        .send({ error: "No existe el token en el header, utiliza Bearer" });
    }
    
    token = token.split(" ")[1];

    const { uid } = jwt.verify(token, process.env.JWT_SECRET);

    req.uid = uid;
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .send({ error: tokenVerificationErrors[error.message] });
  }
};
