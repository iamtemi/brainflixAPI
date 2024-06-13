import { timeStamp } from "console";
import express from "express";
import fs from "fs";
import { v4 as uuid } from "uuid";

const router = express.Router();

const videosJson = fs.readFileSync("./data/video-details.json");
const parsedVideos = JSON.parse(videosJson);
const time = new Date().getTime();

// GET VIDEOS
router.get("/", (req, res) => {
  const filteredVideos = parsedVideos.map((video) => {
    const { id, title, channel, image } = video;
    return { id, title, channel, image };
  });

  res.json(filteredVideos);
});

// GET VIDEO BY ID
router.get("/:id", (req, res) => {
  const id = req.params.id;

  const videoDetail = parsedVideos.find((video) => id === video.id);

  if (!videoDetail) {
    return res.status(404).json({
      message: "No video with that id exists",
    });
  }

  res.json(videoDetail);
});

// POST VIDEO
router.post("/", (req, res) => {
  const { title, description } = req.body;

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: "Incomplete POST body",
      requiredProperties: ["title", "description"],
    });
  }

  const newVideo = {
    id: uuid(),
    title: title,
    channel: "Aiden Thompson",
    image: "../public/image1.jpg",
    description: description,
    views: 0,
    likes: 0,
    duration: "4:01",
    video: "https://unit-3-project-api-0a5620414506.herokuapp.com/stream",
    timestamp: time,
    comments: [],
  };

  parsedVideos.push(newVideo);
  fs.writeFileSync("./data/video-details.json", JSON.stringify(parsedVideos));

  res.json(newVideo);
});

// POST COMMENT TO VIDEO
router.post("/:id/comments", (req, res) => {
  const { name, comment } = req.body;

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: "Incomplete POST body",
      requiredProperties: ["comment", "name"],
    });
  }

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
