import { Router } from "express";

const userRouter = Router();

userRouter.route("/").get((req, res) => {
  res.send("Hello vue academy");
});

userRouter.route("/:userId").get((req, res) => {
  res.send("Get Single vue academy" + req.params.userId);
});

userRouter.route("/").post((req, res) => {
  res.send("Create vue academy");
});

userRouter.route("/:userId").put((req, res) => {
  res.send("Update vue academy" + req.params.userId);
});

userRouter.route("/:userId").delete((req, res) => {
  res.send("Delete vue academy" + req.params.userId);
});

export { userRouter };
