import express from "express";
import cors from "cors";

const app = express();

// use of middlewares here
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Auth Service Running",
  });
});

export default app;
