export async function getUsdcSupply() {
  const apiKey = process.env.GROVE_PORTAL_API_KEY;
  const appId = process.env.GROVE_PORTAL_APP_ID;

  if (!apiKey || !appId) {
    throw new Error("Missing Grove Portal API key or App ID");
  }

  const response = await fetch(`https://eth.rpc.grove.city/v1/${appId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: apiKey,
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "eth_call",
      params: [
        {
          to: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
          data: "0x18160ddd",
        },
        "latest",
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch USDC supply: ${response.statusText}`);
  }

  const data = await response.json();

  if (data.error) {
    throw new Error(`Error from Grove API: ${data.error.message}`);
  }

  const hexValue = data.result;
  const numericValue = parseInt(hexValue, 16) / 1e6;

  return numericValue;
}
