import { sepolia } from "wagmi/chains"

export const NETWORKS = {
  SEPOLIA: {
    id: sepolia.id,
    name: sepolia.name,
  },
}
export const TARGET_NETWORK_ID = NETWORKS.SEPOLIA.id
