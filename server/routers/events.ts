import { Router } from "express";
import { validation } from "../utils";
import { check } from "express-validator";
import { eventController } from "../controllers/event";

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

/**
 * @swagger
 * /event:
 *   post:
 *     tags: [
 *       event
 *     ]
 *     description: Creates a new event
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *       description: Created expense object
 *       required: true
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       201:
 *         description: Event Created
 */
eventRouter
  .route("/")
  .post(
    [
      check("name")
        .exists()
        .trim()
        .isLength({ min: 3 })
        .withMessage("the event's name must have a minimum length of 3"),
      check("start_date")
        .exists()
        .isDate()
        .withMessage("The event must have a valid start date"),
      check("end_date")
        .optional()
        .isDate()
        .withMessage("The event must have a valid end date"),
      check("type_id").optional().isInt(),
    ],
    validation.validate,
    eventController.createEvent
  );

eventRouter.route("/").get(eventController.getAllEvents);

eventRouter.route("/:eventId(\\d+)").get(eventController.getEventById);

eventRouter
  .route("/:eventId")
  .put(
    [
      check("name")
        .exists()
        .trim()
        .isLength({ min: 3 })
        .withMessage("the event's name must have a minimum length of 3"),
      check("start_date")
        .exists()
        .isDate()
        .withMessage("The event must have a valid start date"),
      check("end_date")
        .optional()
        .isDate()
        .withMessage("The event must have a valid end date"),
      check("type_id").optional().isInt(),
    ],
    validation.validate,
    eventController.updateEvent
  );

eventRouter.route("/:eventId").delete(eventController.deleteEventById);

export { eventRouter };
