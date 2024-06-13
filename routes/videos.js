import express from "express";
import fs from "fs";

const router = express.Router();

router.get("/", (req, res) => {
  const videosJson = fs.readFileSync("./data/video-details.json");
  const parsedVideos = JSON.parse(videosJson);

  const filteredVideos = parsedVideos.map((video) => {
    const { id, title, channel, image } = video;
    return { id, title, channel, image };
  });

  res.json(filteredVideos);
});

export default router;
