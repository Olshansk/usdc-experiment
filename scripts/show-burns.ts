import { getBurns } from '../lib/usdc-events';

async function main() {
  const fromBlock = parseInt(process.argv[2], 10);
  const toBlock = parseInt(process.argv[3], 10);

  if (isNaN(fromBlock) || isNaN(toBlock)) {
    console.error('Usage: pnpm exec ts-node scripts/show-burns.ts <fromBlock> <toBlock>');
    process.exit(1);
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
