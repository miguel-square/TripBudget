import express, { Request, Response } from "express";
import {
  userRouter,
  eventUserRouter,
  eventRouter,
  expenseRouter,
  userExpenseRouter,
} from "./routers/index";

const app = express();
const port = 3000;

app.use("/user", userRouter);
app.use("/event", eventRouter);
app.use("/expense", expenseRouter);
app.use("/user_expense", userExpenseRouter);
app.use("/event_user", eventUserRouter);

app.get("/", (req: Request, res: Response) => res.send("Hello World"));

app.listen(port, () => console.log(`Application started on port: ${port}`));
