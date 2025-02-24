"use client"
import { useReadContract, useAccount } from "wagmi"
import { Box } from "@mui/material"

import { useIsWrongNetwork } from "src/hooks/useWrongNetwork"
import { ContractConfig } from "@components/ContractConfig "
import { CONFIG } from "src/utils/constans"

export const TokenBalance = () => {
  const { isConnected } = useAccount()
  const isWrongNetwork = useIsWrongNetwork()

  const { data: balance } = useReadContract({
    ...ContractConfig,
    functionName: "balanceOf",
    args: [CONFIG.TOKEN_ADDRESS],
  })

  if (isConnected && !isWrongNetwork) {
    {
      return <Box>Balance: {balance?.toString()}</Box>
    }
  }
}
