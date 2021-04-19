import express from "express";
import { UserRouter } from "./routers/user-router";
import { ToDoRouter } from "./routers/todo-router";
import { JWTMiddleware } from "./middlewares/jwt-middleware";

const app = express();
app.use(express.json());

app.get("/isAlive", async (req, res) => {
	res.status(200).send();
});

app.all("/api/*", JWTMiddleware.verifyToken);

app.use("/user", UserRouter.getUserRouter());
app.use("/api/todo", ToDoRouter.getToDoRouter());

export { app };
