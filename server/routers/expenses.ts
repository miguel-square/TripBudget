import { Router } from "express";

const expenseRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Expense:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The expense ID.
 *           example: 1
 *         description:
 *           type: string
 *           description: The expense description.
 *           example: Dinner expense
 *         value:
 *           type: number
 *           format: float
 *           description: The expense value.
 *           example: 50.99
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date and time of the expense.
 *           example: 2023-07-01T19:30:00Z
 *         currency_id:
 *           type: integer
 *           description: The ID of the currency for the expense.
 *           example: 1
 */

/**
 * @swagger
 * /expense:
 *   post:
 *     tags: [
 *       expense
 *     ]
 *     description: Creates a new expense
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Expense'
 *       description: Created expense object
 *       required: true
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       201:
 *         description: Expense Created
 */
expenseRouter.route("/").post((req, res) => {
  res.send("Create vue academy");
});

/**
 * @swagger
 * /expense:
 *   get:
 *     description: Retrieves a expense object array.
 *     tags:
 *      - expense
 *     responses:
 *       200:
 *         description: A valid array of expenses object.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Expense'
 */
expenseRouter.route("/").get((req, res) => {
  res.send("Hello vue academy");
});

/**
 * @swagger
 * /expense/{expenseId}:
 *   get:
 *     description: Retrieves a single expense object based on its id.
 *     tags: [
 *       expense
 *     ]
 *     parameters:
 *       - name: expenseId
 *         in: path
 *         type: integer
 *         description: The ID of the requested expense.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Expense'
 *       204:
 *         description: No content
 */
expenseRouter.route("/:expenseId").get((req, res) => {
  res.send("Get Single vue academy" + req.params.expenseId);
});

/**
 * @swagger
 * /expense/{expenseId}:
 *   put:
 *     description: Updates a expense object based on its id.
 *     tags:
 *      - expense
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the expense to update.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A valid expense object.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Expense'
 */
expenseRouter.route("/:expenseId").put((req, res) => {
  res.send("Update vue academy" + req.params.expenseId);
});

/**
 * @swagger
 * /expense/{expenseId}:
 *   delete:
 *     description: Deletes a expense object based on its id.
 *     tags:
 *      - expense
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the expense to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: The expense has been deleted.
 */
expenseRouter.route("/:expenseId").delete((req, res) => {
  res.send("Delete vue academy" + req.params.expenseId);
});

export { expenseRouter };
