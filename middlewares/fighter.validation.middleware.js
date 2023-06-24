import { FIGHTER } from "../models/fighter.js";

const createFighterValid = (req, res, next) => {
  try {
  } catch (error) {
    next();
  }
  // TODO: Implement validatior for FIGHTER entity during creation
};

const updateFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during update
  next();
};

export { createFighterValid, updateFighterValid };
