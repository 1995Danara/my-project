import { useAccount, useReadContract } from "wagmi"
import { TokenContractConfig } from "@config/contract-config"

export const useTokenInfo = (recipientAddress?: string) => {
  const { address } = useAccount()

  const { data: balanceData } = useReadContract({
    address: TokenContractConfig.address,
    abi: TokenContractConfig.abi,
    functionName: "balanceOf",
    args: [address! as `0x${string}`],
  })

  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: TokenContractConfig.address,
    abi: TokenContractConfig.abi,
    functionName: "allowance",
    args: [address! as `0x${string}`, recipientAddress as `0x${string}`],
  })

  const { data: decimals } = useReadContract({
    abi: TokenContractConfig.abi,
    address: TokenContractConfig.address,
    functionName: "decimals",
  })

  return { tokenBalance: balanceData, allowance, decimals, refetchAllowance }
}
