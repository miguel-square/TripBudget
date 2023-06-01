import { Router } from "express";

const eventRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The event ID.
 *           example: 1
 *         name:
 *           type: string
 *           description: The event name.
 *           example: Summer Party
 *         start_date:
 *           type: string
 *           format: date
 *           description: The start date of the event.
 *           example: 2023-07-01
 *         end_date:
 *           type: string
 *           format: date
 *           description: The end date of the event.
 *           example: 2023-07-05
 *         type_id:
 *           type: integer
 *           description: The ID of the event type.
 *           example: 1
 */

eventRouter.route("/").get((req, res) => {
  res.send("Hello vue academy");
});

eventRouter.route("/:eventId").get((req, res) => {
  res.send("Get Single vue academy" + req.params.eventId);
});

eventRouter.route("/").post((req, res) => {
  res.send("Create vue academy");
});

eventRouter.route("/:eventId").put((req, res) => {
  res.send("Update vue academy" + req.params.eventId);
});

eventRouter.route("/:eventId").delete((req, res) => {
  res.send("Delete vue academy" + req.params.eventId);
});

export { eventRouter };
