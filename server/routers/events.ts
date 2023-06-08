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

/**
 * @swagger
 * /event:
 *   get:
 *     description: Retrieves an event object array.
 *     tags:
 *      - event
 *     responses:
 *       200:
 *         description: A valid array of events object.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 */
eventRouter.route("/").get(eventController.getAllEvents);

/**
 * @swagger
 * /event/{eventId}:
 *   get:
 *     description: Retrieves a single event object based on its id.
 *     tags: [
 *       event
 *     ]
 *     parameters:
 *       - name: eventId
 *         in: path
 *         type: integer
 *         description: The ID of the requested event.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *       204:
 *         description: No content
 */
eventRouter.route("/:eventId(\\d+)").get(eventController.getEventById);

/**
 * @swagger
 * /event/{eventId}:
 *   put:
 *     description: Updates a event object based on its id.
 *     tags:
 *      - event
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the event to update.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A valid event object.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 */
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

/**
 * @swagger
 * /event/{eventId}:
 *   delete:
 *     description: Deletes a event object based on its id.
 *     tags:
 *      - event
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the event to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: The event has been deleted.
 */
eventRouter.route("/:eventId").delete(eventController.deleteEventById);

export { eventRouter };
