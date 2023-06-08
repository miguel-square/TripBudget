import { Router } from "express";
import { validation } from "../utils";
import { check } from "express-validator";
import { userExpenseController } from "../controllers/user-expense";

const userExpenseRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     UserExpense:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The user expense ID.
 *           example: 1
 *         user_id:
 *           type: integer
 *           description: The ID of the user associated with the expense.
 *           example: 1
 *         expense_id:
 *           type: integer
 *           description: The ID of the expense associated with the user.
 *           example: 1
 *         is_owner:
 *           type: boolean
 *           description: Indicates if the user is the owner of the expense.
 *           example: true
 *         ratio:
 *           type: number
 *           format: float
 *           description: The ratio of the expense shared by the user.
 *           example: 0.5
 *         paid:
 *           type: boolean
 *           description: Indicates if the user has paid for the expense.
 *           example: false
 */

/**
 * @swagger
 * /user_expense:
 *   post:
 *     tags: [
 *       user-expense
 *     ]
 *     description: Creates a new user-expense object
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserExpense'
 *       description: Created user-expense object
 *       required: true
 *     responses:
 *       400:
 *         description: Bad Request - required values are missing.
 *       201:
 *         description: user-expense object Created
 */
userExpenseRouter
  .route("/")
  .post(
    [
      check("user_id").exists().isInt(),
      check("expense_id").exists().isInt(),
      check("is_owner").exists().isBoolean(),
      check("paid").optional().isBoolean(),
      check("ratio").optional().isFloat(),
    ],
    validation.validate,
    userExpenseController.createUserExpense
  );

/**
 * @swagger
 * /user_expense:
 *   get:
 *     description: Retrieves a user-expense objects array.
 *     tags:
 *      - user-expense
 *     responses:
 *       200:
 *         description: A valid array of user-expenses objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserExpense'
 */
userExpenseRouter.route("/").get(userExpenseController.getAllUserExpenses);

/**
 * @swagger
 * /user_expense/{userExpenseId}:
 *   get:
 *     description: Retrieves a single user-expense object based on its id.
 *     tags: [
 *       user-expense
 *     parameters:
 *       - name: userExpenseId
 *         in: path
 *         type: integer
 *         description: The ID of the requested user-expense.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserExpense'
 *       204:
 *         description: No content
 */
userExpenseRouter
  .route("/:userExpenseId(\\d+)")
  .get(userExpenseController.getUserExpenseById);

/**
 * @swagger
 * /user_expense/{userExpenseId}:
 *   put:
 *     description: Updates a user-expense object based on its id.
 *     tags:
 *      - user-expense
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user-expense to update.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A valid user-expense object.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserExpense'
 */
userExpenseRouter
  .route("/:userExpenseId")
  .put(
    [
      check("user_id").exists().isInt(),
      check("expense_id").exists().isInt(),
      check("is_owner").exists().isBoolean(),
      check("paid").optional().isBoolean(),
      check("ratio").optional().isFloat(),
    ],
    validation.validate,
    userExpenseController.updateUserExpense
  );

/**
 * @swagger
 * /user_expense/{userExpenseId}:
 *   delete:
 *     description: Deletes a user-expense object based on its id.
 *     tags:
 *      - user-expense
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user-expense object to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: The user-expense object has been deleted.
 */
userExpenseRouter
  .route("/:userExpenseId")
  .delete(userExpenseController.deleteUserExpenseById);

export { userExpenseRouter };
