import { validationResult, body, param } from "express-validator";

//Este es el midelware que retorna el errore de los demas y luego el next para que continue
export const validationResultExpress = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    //importante mencionar el status para mostrar la informacion correcta
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const bodyAddUserValidator = [
  //estos son metodos que se utilizan antes de que llegue al agregar user es decir al controlador
  body("nombre", "El campo nombre no cumple con el formato")
    .trim()
    .isLength({ min: 3 }),
  body("email", "Formato de email incorrecto")
    .trim()
    .isEmail()
    .normalizeEmail(),
  body("password", "Minimo 6 caracteres en la contraseña")
    .trim()
    .isLength({ min: 6 }),
  body("password", "Formato de contraseña incorrecto").custom(
    (value, { req }) => {
      if (value != req.body.repassword) {
        throw new Error("no coinciden las contraseñas");
      }
      return value;
    }
  ),
  // esto hará que se ejecute la función de arriba para retornar el error
  validationResultExpress,
];

export const bodyLoginValidator = [
  body("email", "Formato de email incorrecto")
    .trim()
    .isEmail()
    .normalizeEmail(),
  body("password", "Minimo 6 caracteres en la contraseña")
    .trim()
    .isLength({ min: 6 }),
  validationResultExpress,
];

export const bodyAddCategoriaValidator = [
  //estos son metodos que se utilizan antes de que llegue al agregar user es decir al controlador
  body("nombre", "El campo nombre no cumple con el formato")
    .trim()
    .isLength({ min: 3 }),
  body("nombre", "El campo descripcion no cumple con el formato")
    .trim()
    .isLength({ min: 10 }),
  // esto hará que se ejecute la función de arriba para retornar el error
  validationResultExpress,
];

export const bodyAddProductoValidator = [
  //estos son metodos que se utilizan antes de que llegue al agregar user es decir al controlador
  body("nombre", "El campo nombre no cumple con el formato")
    .trim()
    .isLength({ min: 3 }),
  body("descripcion", "El campo descripcion no cumple con el formato")
    .trim()
    .isLength({ min: 5 }),
  // esto hará que se ejecute la función de arriba para retornar el error
  validationResultExpress,
];