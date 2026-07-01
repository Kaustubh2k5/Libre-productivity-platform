import express from "express";
import cors from "cors";
import sandboxRoutes from "./routes/sandbox.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.get("/health", (req: any, res: any) => {
  res.status(200).json({
    status: "ok",
    service: "sandbox",
  });
});

app.use("/api/sandbox", sandboxRoutes);

export default app;
