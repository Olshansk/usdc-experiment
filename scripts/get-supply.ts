import { config } from 'dotenv';
import { getUsdcSupply } from '../lib/usdc';

config();

async function main() {
  try {
    const supply = await getUsdcSupply();
    console.log(`Current USDC Supply: ${supply.toLocaleString('en-US')} USDC`);
  } catch (error) {
    console.error('Error fetching USDC supply:', error);
  }
}

main();
