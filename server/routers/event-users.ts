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

/**
 * @swagger
 * /event_user:
 *   get:
 *     description: Retrieves a user-event objects array.
 *     tags:
 *      - event-user
 *     responses:
 *       200:
 *         description: A valid array of user-events objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EventUser'
 */
eventUserRouter.route("/").get(eventUserController.getAllEventUsers);

/**
 * @swagger
 * /event_user/{eventUserId}:
 *   get:
 *     description: Retrieves a single event-user object based on its id.
 *     tags: [
 *       event-user
 *     ]
 *     parameters:
 *       - name: eventUserId
 *         in: path
 *         type: integer
 *         description: The ID of the requested event-user.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EventUser'
 *       204:
 *         description: No content
 */
eventUserRouter
  .route("/:eventUserId(\\d+)")
  .get(eventUserController.getEventUserById);

/**
 * @swagger
 * /event_user/{eventUserId}:
 *   put:
 *     description: Updates a event-user object based on its id.
 *     tags:
 *      - event-user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the event-user to update.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A valid event-user object.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EventUser'
 */
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

/**
 * @swagger
 * /event_user/{eventUserId}:
 *   delete:
 *     description: Deletes a event-user object based on its id.
 *     tags:
 *      - event-user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the event-user object to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: The event-user object has been deleted.
 */
eventUserRouter
  .route("/:eventUserId")
  .delete(eventUserController.deleteEventUserById);

export { eventUserRouter };
