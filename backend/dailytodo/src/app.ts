import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todo.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req: any, res: any) => {
  res.status(200).json({
    status: "ok",
    service: "dailytodo"
  });
});

app.use("/api", todoRoutes);

export default app;
