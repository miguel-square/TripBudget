import express, { json, urlencoded, Request, Response } from "express";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import {
  userRouter,
  eventUserRouter,
  eventRouter,
  expenseRouter,
  userExpenseRouter,
  authRouter,
} from "./routers/index";
import { verifyToken } from "./middleware/authentication";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Tripbudget App API",
    version: "1.0.0",
  },
  servers: [
    {
      url: "",
      description: "Local development server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        in: "header",
        name: "Authorization",
        description: "Bearer token to access these api endpoints",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
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

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(openapiSpecification));
app.use("/swagger.json", (req: Request, res: Response) =>
  res.json(openapiSpecification).status(200)
);

app.all("*", verifyToken);

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/event", eventRouter);
app.use("/expense", expenseRouter);
app.use("/user_expense", userExpenseRouter);
app.use("/event_user", eventUserRouter);
app.get("/", (req: Request, res: Response) => res.send("Hello World"));

app.listen(port, () => console.log(`Application started on port: ${port}`));
