import express, { json, urlencoded, Request, Response } from "express";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import {
  userRouter,
  eventUserRouter,
  eventRouter,
  expenseRouter,
  userExpenseRouter,
} from "./routers/index";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "TripBud App",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local development server",
    },
  ],
};

const openapiSpecification = swaggerJSDoc({
  swaggerDefinition,
  apis: ["./routers/*.ts"],
});

const app = express();
const port = 3000;

app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/user", userRouter);
app.use("/event", eventRouter);
app.use("/expense", expenseRouter);
app.use("/user_expense", userExpenseRouter);
app.use("/event_user", eventUserRouter);
app.get("/", (req: Request, res: Response) => res.send("Hello World"));

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(openapiSpecification));

app.use("/swagger.json", (req: Request, res: Response) =>
  res.json(openapiSpecification).status(200)
);

app.listen(port, () => console.log(`Application started on port: ${port}`));
