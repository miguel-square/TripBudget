import { Router } from "express";
import { validation } from "../utils";
import { check } from "express-validator";
import { expenseController } from "../controllers/expense";

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
expenseRouter
  .route("/")
  .post(
    [
      check("description")
        .exists()
        .trim()
        .isLength({ min: 3 })
        .withMessage("the description must have a minimum length of 3"),
      check("value")
        .exists()
        .isFloat()
        .withMessage("the value must be a valid number"),
      check("date")
        .exists()
        .isDate()
        .withMessage("The expense must have a valid date"),
      check("currency_id").optional().isInt(),
    ],
    validation.validate,
    expenseController.createExpense
  );

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
expenseRouter.route("/").get(expenseController.getAllExpenses);

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
expenseRouter.route("/:expenseId(\\d+)").get(expenseController.getExpenseById);

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
expenseRouter
  .route("/:expense_id(\\d+)")
  .put(
    [
      check("description")
        .exists()
        .trim()
        .isLength({ min: 3 })
        .withMessage("the description must have a minimum length of 3"),
      check("value")
        .exists()
        .isFloat()
        .withMessage("the value must be a valid number"),
      check("date")
        .exists()
        .isDate()
        .withMessage("The expense must have a valid date"),
      check("currency_id").optional().isInt(),
    ],
    validation.validate,
    expenseController.updateExpense
  );

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
expenseRouter.route("/:expenseId").delete(expenseController.deleteExpenseById);

export { expenseRouter };
