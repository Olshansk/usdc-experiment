import { getMints } from '../lib/usdc-events';

async function main() {
  const fromBlock = parseInt(process.argv[2], 10);
  const toBlock = parseInt(process.argv[3], 10);

  if (isNaN(fromBlock) || isNaN(toBlock)) {
    console.error('Usage: pnpm exec ts-node scripts/show-mints.ts <fromBlock> <toBlock>');
    process.exit(1);
  }

  try {
    const mints = await getMints(fromBlock, toBlock);
    console.log(`Found ${mints.length} mints from block ${fromBlock} to ${toBlock}:`);
    console.table(mints);
  } catch (error) {
    console.error('Error fetching mints:', error);
  }
}

main();
