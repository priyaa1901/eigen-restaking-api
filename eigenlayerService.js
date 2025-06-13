const axios = require('axios');

const SUBGRAPH_URL = 'https://gateway.thegraph.com/api/ef97f3f679a23dc6f1cce6e2b68ffeac/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV';

async function getRestakers() {
  const query = `
    {
      swaps(first: 10, orderBy: amountUSD, orderDirection: desc) {
        id
        sender
        recipient
        amountUSD
      }
    }
  `;

  try {
    const response = await axios.post(SUBGRAPH_URL, { query });
    const swaps = response.data?.data?.swaps;

    if (!swaps) {
      console.error("swaps not found in response:", response.data);
      return [];
    }

    return swaps.map(tx => ({
      userAddress: tx.sender,
      amountRestaked: Number(tx.amountUSD).toFixed(2),
      validatorAddress: tx.recipient
    }));
  } catch (error) {
    console.error("Error in getRestakers:", error.message);
    return [];
  }
}


async function getValidators() {
    const query = `
      {
        swaps(first: 100) {
          recipient
          amountUSD
        }
      }
    `;
  
    try {
      const response = await axios.post(SUBGRAPH_URL, { query });
      const swaps = response.data?.data?.swaps;
  
      const validatorMap = {};
  
      for (let tx of swaps) {
        const address = tx.recipient;
        const amount = Number(tx.amountUSD);
  
        if (!validatorMap[address]) {
          validatorMap[address] = {
            operator: address,
            totalDelegated: 0,
            slashHistory: [],
            status: "active"
          };
        }
  
        validatorMap[address].totalDelegated += amount;
      }
  
      return Object.values(validatorMap).map(val => ({
        ...val,
        totalDelegated: val.totalDelegated.toFixed(2)
      }));
    } catch (error) {
      console.error("Error in getValidators:", error.message);
      return [];
    }
  }
  

  async function getRewardsByAddress(address) {
    const query = `
      {
        swaps(where: { recipient: "${address}" }) {
          amountUSD
          sender
        }
      }
    `;
  
    try {
      const response = await axios.post(SUBGRAPH_URL, { query });
      const swaps = response.data?.data?.swaps;
  
      let total = 0;
      const breakdown = {};
  
      for (let tx of swaps) {
        const amount = Number(tx.amountUSD);
        total += amount;
        if (!breakdown[tx.sender]) breakdown[tx.sender] = 0;
        breakdown[tx.sender] += amount;
      }
  
      return {
        wallet: address,
        totalRewards: total.toFixed(2),
        breakdown: Object.entries(breakdown).map(([from, amt]) => ({
          from,
          amount: amt.toFixed(2)
        }))
      };
    } catch (error) {
      console.error("Error in getRewardsByAddress:", error.message);
      return {
        wallet: address,
        totalRewards: "0",
        breakdown: []
      };
    }
  }
  
  module.exports = {
    getRestakers,
    getValidators,
    getRewardsByAddress
  };
  
