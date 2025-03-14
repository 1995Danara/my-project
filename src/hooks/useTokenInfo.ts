import { useAccount, useReadContract } from "wagmi"

import { TokenContractConfig } from "@config/contract-config"
import { formatUnits } from "viem"

export const useTokenInfo = (recipientAddress?: string) => {
  const { address } = useAccount()

  const { data: balanceData, refetch: refetchTokenBalance } = useReadContract({
    address: TokenContractConfig.address,
    abi: TokenContractConfig.abi,
    functionName: "balanceOf",
    args: [address as `0x${string}`],
  })

  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: TokenContractConfig.address,
    abi: TokenContractConfig.abi,
    functionName: "allowance",
    args: [address as `0x${string}`, recipientAddress as `0x${string}`],
  })

  const { data: decimals } = useReadContract({
    abi: TokenContractConfig.abi,
    address: TokenContractConfig.address,
    functionName: "decimals",
  })

  const allowanceFormatted = allowance && decimals ? formatUnits(allowance, decimals) : undefined

  return {
    tokenBalance: balanceData,
    allowance: allowanceFormatted,
    decimals,
    refetchAllowance,
    refetchTokenBalance,
  }
}
