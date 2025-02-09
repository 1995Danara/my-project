import { useAccount } from "wagmi"
import { sepolia } from "wagmi/chains"

export const useIsWrongNetwork = () => {
  const { chain } = useAccount()
  return chain?.id !== sepolia.id
}
