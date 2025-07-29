const express = require('express');
const router = express.Router();
const Report = require('../models/Report');

router.post('/', async (req, res) => {
  try {
    const { imageUrl, coordinates } = req.body;

    const newReport = new Report({ imageUrl, coordinates });
    await newReport.save();

    res.status(201).json({ message: 'Report saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to save report' });
  }
});

module.exports = router;
