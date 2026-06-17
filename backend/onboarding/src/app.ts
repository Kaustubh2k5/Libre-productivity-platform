import express from "express";
import onboardingRoute from "./routes/onboarding.route.js";

const app = express();

app.use(express.json());

app.get("/health", (req: any, res: any) => {
  res.status(200).json({
    status: "ok",
  });
});

app.use("/onboarding", onboardingRoute);

export default app;
