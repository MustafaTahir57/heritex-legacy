const MORALIS_BASE_URL = "https://deep-index.moralis.io/api/v2.2";

export async function getWalletTokenBalances(address , chain) {
  if (!address) throw new Error("Wallet address is required");

  const url = `${MORALIS_BASE_URL}/wallets/${address}/tokens?chain=${chain}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "X-API-Key": import.meta.env.VITE_MORALIS_API_KEY, 
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Moralis API Error: ${error}`);
  }

  const data = await response.json();
  return data;
}
