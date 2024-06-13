import express from "express";
import fs from "fs";

const router = express.Router();

const videosJson = fs.readFileSync("./data/video-details.json");
const parsedVideos = JSON.parse(videosJson);

router.get("/", (req, res) => {
  const filteredVideos = parsedVideos.map((video) => {
    const { id, title, channel, image } = video;
    return { id, title, channel, image };
  });

  res.json(filteredVideos);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const videoDetail = parsedVideos.find((video) => id === video.id);
  res.json(videoDetail);
});


export default router;
