import "dotenv/config";
import app from "./app.js";

const PORT = process.env.PORT || 8082;

app.listen(PORT, () => {
  console.log(`DailyTodo microservice running on port ${PORT}`);
});
