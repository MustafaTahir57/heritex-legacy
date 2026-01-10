import { createConfig, http } from 'wagmi'
import { mainnet, base } from 'wagmi/chains'
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'

const projectId = "18e5dbfec5539cf4cd18f5ecdf94eb6a"

export const config = createConfig({
  chains: [mainnet, base],
  connectors: [
    injected(),
    walletConnect({ projectId: "18e5dbfec5539cf4cd18f5ecdf94eb6a" })
  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
})