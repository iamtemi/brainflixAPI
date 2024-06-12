import express from "express";
import "dotenv/config";
import fs from "fs";
import { v4 as uuid } from "uuid";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;
const BASE_URL = process.env.BASE_URL || localhost;

app.get("/", (req, res) => {
  const videosJson = fs.readFileSync("./data/video-details.json");
  const parsedVideos = JSON.parse(videosJson);
  res.json(parsedVideos);
});

app.get("/register", (req, res) => {
  const apiKey = uuid();

  res.json({
    api_key: `${apiKey}`,
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port http://${BASE_URL}:${PORT}`);
});
