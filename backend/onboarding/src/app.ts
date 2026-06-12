import express from "express";

import onboardingRoute from "./routes/onboarding.route.js";

const app = express();

app.use(express.json());

app.use(
    "/onboarding",
    onboardingRoute
);

export default app;