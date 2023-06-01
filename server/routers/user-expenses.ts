import { Router } from "express";

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

userExpenseRouter.route("/").get((req, res) => {
  res.send("Hello vue academy");
});

userExpenseRouter.route("/:userExpenseId").get((req, res) => {
  res.send("Get Single vue academy" + req.params.userExpenseId);
});

userExpenseRouter.route("/").post((req, res) => {
  res.send("Create vue academy");
});

userExpenseRouter.route("/:userExpenseId").put((req, res) => {
  res.send("Update vue academy" + req.params.userExpenseId);
});

userExpenseRouter.route("/:userExpenseId").delete((req, res) => {
  res.send("Delete vue academy" + req.params.userExpenseId);
});

export { userExpenseRouter };
