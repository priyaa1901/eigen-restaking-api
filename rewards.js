const express = require('express');
const router = express.Router();
const { getRewardsByAddress } = require('../../services/eigenlayerService');

router.get('/:address', async (req, res) => {
  try {
    const address = req.params.address.toLowerCase();
    const data = await getRewardsByAddress(address);
    res.json(data);
  } catch (error) {
    console.error("Error fetching rewards:", error.message);
    res.status(500).json({ error: 'Failed to fetch rewards' });
  }
});

module.exports = router;
