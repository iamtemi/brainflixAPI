import { timeStamp } from "console";
import express from "express";
import fs from "fs";
import { v4 as uuid } from "uuid";

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

router.post("/:id/comments", (req, res) => {
  const { name, comment } = req.body;

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: "Incomplete POST body",
      requiredProperties: ["comment", "name"],
    });
  }

  const time = new Date().getTime();

  const newComment = {
    name: name,
    comment: comment,
    id: uuid(),
    timeStamp: time,
  };

  const newCommentJson = JSON.stringify(newComment);

  const id = req.params.id;
  const videoDetail = parsedVideos.find((video) => id === video.id);
  const videoComments = videoDetail.comments;
  videoComments.push(newComment);

  fs.writeFileSync("./data/video-details.json", JSON.stringify(parsedVideos));

  res.json(newComment);
});

export default router;
