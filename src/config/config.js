import { createConfig, http } from 'wagmi'
import { mainnet, base , bsc } from 'wagmi/chains'
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'

export const config = createConfig({
  chains: [bsc],
  connectors: [
    injected(),
    metaMask(),
    walletConnect({ projectId: "18e5dbfec5539cf4cd18f5ecdf94eb6a" })
  ],
  transports: {
    [bsc.id]: http(),
  },
})