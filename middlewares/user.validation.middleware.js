import { USER } from "../models/user.js";
import { UserService } from "../services/userService";

const emailValidation = (email) => {
  const validation = /^\w+([\.-]?\w+)*@gmail.com/;
  return validation.test(email);
};

const numberValidation = (number) => {
  const validation = /\+380\d{9}/;
  return validation.test(number);
};

const passwordValidation = (password) => {
  const validation = /.{3}/;
  return validation.test(password);
};

const validationCreateUser = (body) => {
  const fields = ["firstName", "lastName", "email", "phoneNumber", "password"];
  if (
    Object.keys(body).length < 5 ||
    !Object.keys(body).every((key) => fields.includes(key))
  )
    return "Invalid format of model";

  if (!body.hasOwnProperty("firstName") || body.firstName === "")
    return "Name field is required and can't be empty";

  if (!body.hasOwnProperty("lastName") || body.lastName === "")
    return "Last name field is required and can't be empty";

  if (UserService.search({ email: body.email }))
    return "User with this email is already exist. Try again";

  if (UserService.search({ email: body.phoneNumber }))
    return "User with this phone number is already exist. Try again";

  if (!emailValidation(body.email) || body.email === "")
    return "Invalid email format";

  if (!numberValidation(body.phoneNumber) || body.phoneNumber === "")
    return "Invalid phone number format";

  if (!passwordValidation(body.password) || body.password === "")
    return "Invalid password format (min 3 characters)";
};

const validationUpdateUser = (body) => {
  const fields = ["firstName", "lastName", "email", "phoneNumber", "password"];
  if (!UserService.search({ email: body.email })) return "User doesn't exist";
  if (Object.keys(body).length === 0)
    return "At least one field from the model must be present";
  if (!Object.keys(body).every((key) => fields.includes(key)))
    return "Some extra fields, please check the model";
};

const createUserValid = (req, res, next) => {
  const errorMessage = validationCreateUser(req);
  if (errorMessage) {
    res.error = errorMessage;
    res.error.status = 400;
  }
  // TODO: Implement validatior for USER entity during creation
  next();
};

const updateUserValid = (req, res, next) => {
  const errorMessage = validationUpdateUser(req);
  if (errorMessage) {
    res.error = errorMessage;
    res.error.status = 404;
  }
  // TODO: Implement validatior for user entity during update
  next();
};

export { createUserValid, updateUserValid };
