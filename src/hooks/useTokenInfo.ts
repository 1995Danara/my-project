import { useAccount, useReadContract } from "wagmi"
import { TokenContractConfig } from "@config/contract-config"

export const useTokenInfo = (setAddress?: string) => {
  const { address } = useAccount()

  const { data: balanceData } = useReadContract({
    address: TokenContractConfig.address,
    abi: TokenContractConfig.abi,
    functionName: "balanceOf",
    args: [address! as `0x${string}`],
  })

  const { data: allowanceData, refetch: refetchAllowance } = useReadContract({
    address: TokenContractConfig.address,
    abi: TokenContractConfig.abi,
    functionName: "allowance",
    args: [address! as `0x${string}`, setAddress as `0x${string}`],
  })

  const { data: decimals } = useReadContract({
    abi: TokenContractConfig.abi,
    address: TokenContractConfig.address,
    functionName: "decimals",
  })

  return { balanceData, allowanceData, decimals, refetchAllowance }
}
