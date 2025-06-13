const express = require('express');
const restakersRoute = require('./routes/restakers');
const validatorsRoute = require('./routes/validators');
const rewardsRoute = require('./routes/rewards');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send(`
      <h2>Welcome to the EigenLayer Restaking Info API 🌐</h2>
      <ul>
        <li><a href="/restakers" target="_blank">🔹 View Restakers</a></li>
        <li><a href="/validators" target="_blank">🔹 View Validators</a></li>
        <li><a href="/rewards/0xd8c07491caa1edf960db3ceff387426d53942ea0" target="_blank">🔹 View Rewards (Example Address)</a></li>
      </ul>
      <p>Replace the address in the rewards URL to test others.</p>
    `);
  });
  

app.use('/restakers', restakersRoute);
app.use('/validators', validatorsRoute);
app.use('/rewards', rewardsRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API is running on http://localhost:${PORT}`);
});
