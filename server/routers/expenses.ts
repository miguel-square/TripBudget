import { Router } from "express";

const expenseRouter = Router();

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
