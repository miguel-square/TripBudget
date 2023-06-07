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

userExpenseRouter.route("/").get(userExpenseController.getAllUserExpenses);

userExpenseRouter
  .route("/:userExpenseId(\\d+)")
  .get(userExpenseController.getUserExpenseById);

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

userExpenseRouter
  .route("/:userExpenseId")
  .delete(userExpenseController.deleteUserExpenseById);

export { userExpenseRouter };
