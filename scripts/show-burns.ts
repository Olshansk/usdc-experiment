import { getBurns } from '../lib/usdc-events';
import { config } from 'dotenv';

config();

const GROVE_API_URL = `https://eth.rpc.grove.city/v1/${process.env.GROVE_PORTAL_APP_ID}`;

async function getLatestBlock() {
  const response = await fetch(GROVE_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "eth_blockNumber",
      params: [],
    }),
  });
  const data = await response.json();
  return parseInt(data.result, 16);
}

async function main() {
  let fromBlock = parseInt(process.argv[2], 10);
  let toBlock = parseInt(process.argv[3], 10);

  if (isNaN(toBlock)) {
    toBlock = await getLatestBlock();
  }

  if (isNaN(fromBlock)) {
    fromBlock = toBlock - 1000;
  }

  try {
    const burns = await getBurns(fromBlock, toBlock);
    console.log(`Found ${burns.length} burns from block ${fromBlock} to ${toBlock}:`);
    console.table(burns);
  } catch (error) {
    console.error('Error fetching burns:', error);
  }
}

main();