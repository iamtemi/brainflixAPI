import express from "express";
import "dotenv/config";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;
const BASE_URL = process.env.BASE_URL || localhost;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Listening on port http://${BASE_URL}:${PORT}`);
});
