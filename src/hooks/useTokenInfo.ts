import { useAccount, useReadContract } from "wagmi"

import { TOKEN_CONTRACT_CONFIG } from "@config/contract-config"
import { formatUnits } from "viem"

export const useTokenInfo = (recipientAddress?: string) => {
  const { address } = useAccount()

  const { data: balanceData, refetch: refetchTokenBalance } = useReadContract({
    address: TOKEN_CONTRACT_CONFIG.address,
    abi: TOKEN_CONTRACT_CONFIG.abi,
    functionName: "balanceOf",
    args: [address as `0x${string}`],
  })

  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: TOKEN_CONTRACT_CONFIG.address,
    abi: TOKEN_CONTRACT_CONFIG.abi,
    functionName: "allowance",
    args: [address as `0x${string}`, recipientAddress as `0x${string}`],
  })

  const { data: decimals } = useReadContract({
    abi: TOKEN_CONTRACT_CONFIG.abi,
    address: TOKEN_CONTRACT_CONFIG.address,
    functionName: "decimals",
  })

  const allowanceFormatted =
    allowance && decimals ? formatUnits(allowance, decimals) : undefined

  return {
    tokenBalance: balanceData,
    allowance: allowanceFormatted,
    decimals,
    refetchAllowance,
    refetchTokenBalance,
  }
}
