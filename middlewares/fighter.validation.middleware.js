import { FIGHTER } from "../models/fighter.js";
import { fighterService } from "../services/fighterService.js";

const validationOnCreate = (fighterBody) => {
  if (fighterBody.hasOwnProperty("id"))
    return "Request body can't include id field";
  if (!fighterBody.hasOwnProperty("name") & (fighterBody?.name === "")) {
    return "Name field is required and can't be empty";
  }
  if (
    !fighterBody.hasOwnProperty("power") ||
    fighterBody?.power >= 100 ||
    fighterBody?.power <= 0
  ) {
    return "Power field is required and can be in range [0; 100]";
  }
  if (
    !fighterBody.hasOwnProperty("defense") ||
    fighterBody?.defence <= 0 ||
    fighterBody.defence >= 10
  ) {
    return "Defense field is required and can be in range [0; 10]";
  }
  if (fighterService.search({ name: fighterBody.name })) {
    return "Fighter with this name is already exist. Try again";
  }
  if (!fighterBody.hasOwnProperty("health") || fighterBody?.health === 0) {
    fighterBody.health = 100;
  }
};

const validationOnUpdate = (fighterBody) => {
  const fields = ["name", "health", "power", "defence"];
  if (!fighterService.search({ id: fighterBody.params.id })) {
    return "Fighter doesn't exist. Try again";
  }
  if (Object.keys(fighterBody).length === 0) {
    return "At least one field from the model must be present";
  }

  if (!Object.keys(fighterBody).every((element) => fields.includes(element))) {
    return "Some extra fields, please check the model";
  }
};

const createFighterValid = (req, res, next) => {
  const errorMessage = validationOnCreate(req.body);
  if (errorMessage) {
    //console.log(errorMessage);
    res.err = Error(errorMessage);
    res.err.status = 400;
    //console.log("res.err here: ", res.err);
  }

  next();

  // TODO: Implement validatior for FIGHTER entity during creation
};

const updateFighterValid = (req, res, next) => {
  const errorMessage = validationOnUpdate(req.body);
  if (errorMessage) {
    res.err = errorMessage;
    res.err.status = 404;
  }
  // TODO: Implement validatior for FIGHTER entity during update
  next();
};

export { createFighterValid, updateFighterValid };
