import { Router } from "express";
import { FighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

router.put(
  "/:id",
  updateFighterValid,
  (req, res, next) => {
    try {
      if (!res.err) {
        res.data = FighterService.updateFighter(req.params.id, req.body);
      }
    } catch (error) {
      res.err = error;
      res.err.status = 400;
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.post(
  "/",
  createFighterValid,
  (req, res, next) => {
    try {
      if (!res.err) {
        res.data = FighterService.create(req.body);
      }
    } catch (err) {
      res.err = err;
      res.err.status = 400;
    } finally {
      next();
    }
  },
  responseMiddleware
);
// TODO: Implement route controllers for fighter

export { router };
