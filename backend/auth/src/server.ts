import dotenv from "dotenv/config";

import app from "./app.js";

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`Auth Service running on port ${PORT}`);
});
