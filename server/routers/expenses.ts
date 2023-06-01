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

expenseRouter.route("/").get((req, res) => {
  res.send("Hello vue academy");
});

expenseRouter.route("/:expenseId").get((req, res) => {
  res.send("Get Single vue academy" + req.params.expenseId);
});

expenseRouter.route("/").post((req, res) => {
  res.send("Create vue academy");
});

expenseRouter.route("/:expenseId").put((req, res) => {
  res.send("Update vue academy" + req.params.expenseId);
});

expenseRouter.route("/:expenseId").delete((req, res) => {
  res.send("Delete vue academy" + req.params.expenseId);
});

export { expenseRouter };
