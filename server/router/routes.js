const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose");
const Question = require("../models/questine");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const upload = multer({ dest: "uploads/" });

const videoSchema = new mongoose.Schema({
  url: String,
});
const Video = mongoose.model("Video", videoSchema);

router.post("/videos", upload.array("files"), async (req, res) => {
  try {
    const files = req.files;
    const urls = [];
    for (const file of files) {
      const result = await cloudinary.uploader.upload(file.path, {
        resource_type: "video",
      });

      const video = new Video({ url: result.secure_url });
      await video.save();

      urls.push(result.secure_url);
    }

    console.log(urls);
    res.status(200).json("success");
  } catch (err) {
    console.log(err);
  }
});

router.post("/questine", async (req, res) => {
  const { questine, answer, wrongOne, wrongTwo } = req.body;
  const answers = [answer, wrongOne, wrongTwo];
  const question = new Question({
    questine,
    answers,
  });
  await question.save();
  res.status(201).json({ message: "Question saved successfully" });
});

router.get("/videos", async (req, res) => {
  const videos = await Video.find({}, "url");

  // Extract URLs from the documents
  const urls = videos.map((video) => video.url);

  // Send the array of URLs as the response
  console.log(urls);
  res.json({ urls });
});

router.get("/questons", async (req, res) => {
  const questines = await Question.find()
  res.json({ questines });
});

module.exports = router;
