import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

router.get(
  "/",
  (req, res, next) => {
    try {
      res.data = fighterService.getAllFighters();
    } catch (error) {
      res.err = error;
      res.err.status = 404;
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.get(
  "/:id",
  (req, res, next) => {
    try {
      res.data = fighterService.getFighter({ id: req.params.id });
    } catch (error) {
      res.err = error;
      res.err.status = 404;
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
        res.data = fighterService.createFighter(req.body);
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
router.put(
  "/:id",
  updateFighterValid,
  (req, res, next) => {
    try {
      if (!res.err) {
        res.data = fighterService.updateFighter(req.params.id, req.body);
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

router.delete(
  "/:id",
  (req, res, next) => {
    try {
      res.data = fighterService.deleteFighter(req.params.id);
    } catch (error) {
      res.err = error;
      res.err.status = 400;
    } finally {
      next();
    }
  },
  responseMiddleware
);
// TODO: Implement route controllers for fighter

export { router };
