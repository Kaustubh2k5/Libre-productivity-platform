import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todo.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});
app.get("/health", (req: any, res: any) => {
  res.status(200).json({
    status: "ok",
    service: "dailytodo"
  });
});

app.use("/api/dailytodo", todoRoutes);

app.use((err: any, req: any, res: any, next: any) => {
  console.error("GLOBAL ERROR");
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message,
  });
});
export default app;
