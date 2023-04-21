const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
// ********* require fileUploader in order to use it *********
const fileUploader = require("../config/cloudinary.config");

const Spot = require("../models/Spot.model");

// POST - CREATE a spot
router.post("/", isAuthenticated, (req, res, next) => {
  const { name, description, category, image } = req.body;
  const userId = req.payload._id;

  Spot.create({ name, description, category, image, userId })
    .then((spot) => res.json(spot))
    .catch((error) => res.json(error));
});

// GET - DISPLAY all spots
router.get("/", (req, res, next) => {
  Spot.find()
    .then((allSpots) => res.json(allSpots))
    .catch((error) => res.json(error));
});

// GET - DISPLAY a spot
router.get("/:spotId", isAuthenticated, (req, res, next) => {
  const { spotId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(spotId)) {
    res.status(400).json({ message: "This is not a valid id" });
  }

  Spot.findById(spotId)
    .then((spot) => res.status(200).json(spot))
    .catch((error) => res.json(error));
});

// POST "/api/upload" => Route that receives the image, sends it to Cloudinary via the fileUploader and returns the image URL
router.post("/upload", fileUploader.single("image"), (req, res, next) => {
  // console.log("file is: ", req.file)

  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }

  // Get the URL of the uploaded file and send it as a response.
  // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend

  res.json({ image: req.file.path });
});

module.exports = router;
