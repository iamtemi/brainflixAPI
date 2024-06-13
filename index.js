import express from "express";
import "dotenv/config";
import fs from "fs";
import { v4 as uuid } from "uuid";
import videosRouter from "./routes/videos.js";
import apiKeyMiddleWare from "./middleware/api-key.js";

const app = express();
app.use(express.json());

app.use(apiKeyMiddleWare);

const PORT = process.env.PORT || 8080;
const BASE_URL = process.env.BASE_URL || localhost;

app.get("/register", (req, res) => {
  const apiKey = uuid();

  res.json({
    api_key: `${apiKey}`,
  });
});

app.use("/videos", videosRouter);

app.listen(PORT, () => {
  console.log(`Listening on port http://${BASE_URL}:${PORT}`);
});
