import { config } from 'dotenv';

config();

const GROVE_API_URL = `https://eth.rpc.grove.city/v1/${process.env.GROVE_PORTAL_APP_ID}`;
const USDC_CONTRACT_ADDRESS = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
const TRANSFER_TOPIC = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000000000000000000000000000";

async function rpc<T>(method: string, params: any[]): Promise<T> {
  const response = await fetch(GROVE_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.GROVE_PORTAL_API_KEY || "",
    },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
  });

  if (!response.ok) {
    throw new Error(`RPC request failed: ${response.statusText}`);
  }

  const data = await response.json();
  if (data.error) {
    throw new Error(`RPC error: ${data.error.message}`);
  }

  return data.result;
}

async function getBlockByHash(hash: string): Promise<{ timestamp: string }> {
  return rpc("eth_getBlockByHash", [hash, false]);
}

async function getLogs(fromBlock: number, toBlock: number, topics: (string | null)[]) {
  const logs = await rpc<any[]>("eth_getLogs", [
    {
      fromBlock: `0x${fromBlock.toString(16)}`,
      toBlock: `0x${toBlock.toString(16)}`,
      address: USDC_CONTRACT_ADDRESS,
      topics,
    },
  ]);

  console.log(`Received ${logs.length} logs from eth_getLogs.`);

  const processedLogs = [];
  for (const log of logs) {
    processedLogs.push({
      to: `0x${log.topics[2].slice(-40)}`,
      from: `0x${log.topics[1].slice(-40)}`,
      amount: Number(BigInt(log.data)) / 1e6,
      txHash: log.transactionHash,
      blockNumber: Number(log.blockNumber),
    });
  }
  return processedLogs;
}

export function getMints(fromBlock: number, toBlock: number) {
  return getLogs(fromBlock, toBlock, [TRANSFER_TOPIC, ZERO_ADDRESS, null]);
}

export function getBurns(fromBlock: number, toBlock: number) {
  return getLogs(fromBlock, toBlock, [TRANSFER_TOPIC, null, ZERO_ADDRESS]);
}
