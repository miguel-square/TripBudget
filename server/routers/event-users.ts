import { Router } from "express";

const eventUserRouter = Router();

eventUserRouter.route("/").get((req, res) => {
  res.send("Hello vue academy");
});

eventUserRouter.route("/:eventUserId").get((req, res) => {
  res.send("Get Single vue academy" + req.params.eventUserId);
});

eventUserRouter.route("/").post((req, res) => {
  res.send("Create vue academy");
});

eventUserRouter.route("/:eventUserId").put((req, res) => {
  res.send("Update vue academy" + req.params.eventUserId);
});

eventUserRouter.route("/:eventUserId").delete((req, res) => {
  res.send("Delete vue academy" + req.params.eventUserId);
});

export { eventUserRouter };
