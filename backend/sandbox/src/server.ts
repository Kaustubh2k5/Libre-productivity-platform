import "dotenv/config";
import app from "./app.js";

const PORT = process.env.PORT || 8083;

app.listen(PORT, () => {
  console.log(`Sandbox microservice listening on port ${PORT}`);
});
