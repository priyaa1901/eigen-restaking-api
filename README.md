# 📊 EigenLayer Restaking Info API

This project implements a backend API using **Node.js + Express** to simulate and expose **EigenLayer restaking data**.  
It uses **live, real-time onchain data** fetched from the **Uniswap V3 subgraph on The Graph (via Gateway API)**.

---

## 🔗 Live API Endpoints

> Run the project and visit [http://localhost:3000](http://localhost:3000)

| Endpoint | Description |
|----------|-------------|
| `GET /restakers` | Returns a list of users who "restaked" stETH (simulated from Uniswap swap senders) |
| `GET /validators` | Lists validators/operators (simulated from recipients) and total delegated stake |
| `GET /rewards/:address` | Displays total reward earned by a wallet (based on incoming transfers) |

---

## ⚙️ Setup Instructions

### 1. Clone this repo and install dependencies
```bash
npm install express axios
