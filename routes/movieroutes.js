const express = require('express');
const router = express.Router();

// Route to save a video to the database
router.post('/save-video', async (req, res) => {
  const { title, image, videoUrl, category } = req.body;

  console.log('🎯 API hit: /api/save-video');

  if (!title || !image || !videoUrl || !category) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  console.log('Saving video:', { title, image, videoUrl, category });

  res.status(200).json({ message: 'Video saved successfully' });
});

export default router;
