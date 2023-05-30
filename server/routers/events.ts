import { Router } from "express";

const eventRouter = Router();

eventRouter.route("/").get((req, res) => {
  res.send("Hello vue academy");
});

eventRouter.route("/:eventId").get((req, res) => {
  res.send("Get Single vue academy" + req.params.eventId);
});

eventRouter.route("/").post((req, res) => {
  res.send("Create vue academy");
});

eventRouter.route("/:eventId").put((req, res) => {
  res.send("Update vue academy" + req.params.eventId);
});

eventRouter.route("/:eventId").delete((req, res) => {
  res.send("Delete vue academy" + req.params.eventId);
});

export { eventRouter };
