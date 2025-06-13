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

## 1. Clone the repo and install dependencies
npm install express axios

## 2. Open services/eigenlayerService.js
###    Replace the line below with your actual Graph API key:
const SUBGRAPH_URL = 'https://gateway.thegraph.com/api/YOUR_API_KEY/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV';

## 3. Start the server
node api/server.js

## 4. Test endpoints in your browser or Postman:
###    ✅ http://localhost:3000/restakers
###    ✅ http://localhost:3000/validators
###    ✅ http://localhost:3000/rewards/<wallet_address>

# 🧠 Assumptions

Since EigenLayer does not yet provide a public subgraph, this project uses the Uniswap V3 subgraph as a real-data proxy to simulate restaking activity.

The following mappings were used to align with the project’s expected structure:
| **PDF Requirement**       | **Mapped From Uniswap Subgraph**     |
| ------------------------- | ------------------------------------ |
| `user who restaked`       | `sender` of a swap                   |
| `amount restaked (stETH)` | `amountUSD` from the swap            |
| `target AVS/operator`     | `recipient` of the swap              |
| `reward`                  | `total amountUSD received` by a user |

This approach allows the use of live, onchain data to fulfill the API requirements realistically and meaningfully.



