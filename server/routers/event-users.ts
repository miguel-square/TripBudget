import { Router } from "express";
import { validation } from "../utils";
import { check } from "express-validator";
import { eventUserController } from "../controllers/event-user";

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

/**
 * @swagger
 * /event_user:
 *   post:
 *     tags: [
 *       event-user
 *     ]
 *     description: Creates a new Event-User object
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EventUser'
 *       description: Created event-user object
 *       required: true
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       201:
 *         description: EventUser Created
 */
eventUserRouter
  .route("/")
  .post(
    [
      check("user_id").exists().isInt(),
      check("event_id").exists().isInt(),
      check("is_admin").exists().isBoolean(),
    ],
    validation.validate,
    eventUserController.createEventUser
  );

eventUserRouter.route("/").get(eventUserController.getAllEventUsers);

eventUserRouter
  .route("/:eventUserId(\\d+)")
  .get(eventUserController.getEventUserById);

eventUserRouter
  .route("/:eventUserId")
  .put(
    [
      check("user_id").exists().isInt(),
      check("event_id").exists().isInt(),
      check("is_admin").exists().isBoolean(),
    ],
    validation.validate,
    eventUserController.updateEventUser
  );

eventUserRouter
  .route("/:eventUserId")
  .delete(eventUserController.deleteEventUserById);

export { eventUserRouter };
