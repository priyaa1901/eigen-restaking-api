const express = require('express');
const router = express.Router();

const { getRestakers } = require('../../services/eigenlayerService');

router.get('/', async (req, res) => {
  try {
    const data = await getRestakers();
    res.json(data);
  } catch (error) {
    console.error("Error fetching restakers:", error.message);
    res.status(500).json({ error: 'Failed to fetch restakers' });
  }
});

module.exports = router;
