import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.get(
  "/",
  (req, res, next) => {
    try {
      res.data = userService.getAllUsers();
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
      res.data = userService.getUser({ id: req.params.id });
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
  createUserValid,
  (req, res, next) => {
    try {
      if (!res.err) {
        res.data = userService.createUser(req.body);
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
  updateUserValid,
  (req, res, next) => {
    try {
      if (!res.err) {
        res.data = userService.updateUser(req.params.id, req.body);
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
      res.data = userService.deleteUser(req.params.id);
    } catch (error) {
      res.err = error;
      res.err.status = 400;
    } finally {
      next();
    }
  },
  responseMiddleware
);

// TODO: Implement route controllers for user

export { router };
