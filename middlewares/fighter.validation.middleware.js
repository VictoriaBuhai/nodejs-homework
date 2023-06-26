import { FIGHTER } from "../models/fighter.js";
import { FighterService } from "../services/fighterService.js";

const validationOnCreate = (body) => {
  if (body.hasOwnProperty("id")) return "Request body can't include id field";
  if (!body.hasOwnProperty("name") & (body?.name === "")) {
    return "Name field is required and can't be empty";
  }
  if (
    !fighterBody.hasOwnProperty("power") ||
    body?.power >= 100 ||
    body?.power <= 0
  ) {
    return "Power field is required and can be in range [0; 100]";
  }
  if (
    !fighterBody.hasOwnProperty("defense") ||
    body?.defence <= 0 ||
    body.defence >= 10
  ) {
    return "Defense field is required and can be in range [0; 10]";
  }
  if (FighterService.search({ name: body.name })) {
    return "Fighter with this name is already exist. Try again";
  }
  if (!body.hasOwnProperty("health") || body?.health === 0) {
    body.health = 100;
  }
};

const validationOnUpdate = (body) => {
  const fields = ["name", "health", "power", "defence"];
  if (!FighterService.search({ id: body.params.id })) {
    return "Fighter doesn't exist. Try again";
  }
  if (Object.keys(body).length === 0) {
    return "At least one field from the model must be present";
  }

  if (!Object.keys(body).every((element) => fields.includes(element))) {
    return "Some extra fields, please check the model";
  }
};

const createFighterValid = (req, res, next) => {
  const errorMessage = validationOnCreate(req);
  if (errorMessage) {
    res.error = errorMessage;
    res.error.status = 400;
  }

  next();

  // TODO: Implement validatior for FIGHTER entity during creation
};

const updateFighterValid = (req, res, next) => {
  const errorMessage = validationOnUpdate(req);
  if (errorMessage) {
    res.error = errorMessage;
    res.error.status = 404;
  }
  // TODO: Implement validatior for FIGHTER entity during update
  next();
};

export { createFighterValid, updateFighterValid };
