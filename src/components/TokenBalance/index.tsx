"use client"
import { useReadContract, useAccount } from "wagmi"
import { Box } from "@mui/material"

import { useIsWrongNetwork } from "@/hooks/useWrongNetwork"
import { ContractConfig } from "@/ContractConfig "
import { TOKEN_ADDRESS } from "utils/constans"

export const TokenBalance = () => {
  const { isConnected } = useAccount()
  const isWrongNetwork = useIsWrongNetwork()

  const { data: balance } = useReadContract({
    ...ContractConfig,
    functionName: "balanceOf",
    args: [TOKEN_ADDRESS],
  })

  if (isConnected && !isWrongNetwork) {
    {
      return <Box>Balance: {balance?.toString()}</Box>
    }
  }
}
