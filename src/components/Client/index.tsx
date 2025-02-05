import { http, createConfig } from "wagmi"
import { sepolia } from "wagmi/chains"

export const Client = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(),
  },
})
