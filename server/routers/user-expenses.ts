import { Router } from "express";

const userExpenseRouter = Router();

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
