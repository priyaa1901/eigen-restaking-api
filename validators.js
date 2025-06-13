const express = require('express');
const router = express.Router();
const { getValidators } = require('../../services/eigenlayerService');

router.get('/', async (req, res) => {
  try {
    const data = await getValidators();
    res.json(data);
  } catch (error) {
    console.error("Error fetching validators:", error.message);
    res.status(500).json({ error: 'Failed to fetch validators' });
  }
});

module.exports = router;
