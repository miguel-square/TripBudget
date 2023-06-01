import { Router } from "express";

const eventUserRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     EventUser:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The event user ID.
 *           example: 1
 *         user_id:
 *           type: integer
 *           description: The ID of the user associated with the event.
 *           example: 1
 *         event_id:
 *           type: integer
 *           description: The ID of the event associated with the user.
 *           example: 1
 *         is_admin:
 *           type: boolean
 *           description: Indicates if the user is an admin of the event.
 *           example: true
 */

eventUserRouter.route("/").get((req, res) => {
  res.send("Hello vue academy");
});

eventUserRouter.route("/:eventUserId").get((req, res) => {
  res.send("Get Single vue academy" + req.params.eventUserId);
});

eventUserRouter.route("/").post((req, res) => {
  res.send("Create vue academy");
});

eventUserRouter.route("/:eventUserId").put((req, res) => {
  res.send("Update vue academy" + req.params.eventUserId);
});

eventUserRouter.route("/:eventUserId").delete((req, res) => {
  res.send("Delete vue academy" + req.params.eventUserId);
});

export { eventUserRouter };
