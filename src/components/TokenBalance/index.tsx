"use client"
import { useReadContract, useAccount } from "wagmi"
import { ContractConfig } from "../ContractConfig "
import { Box } from "@mui/material"
import { useIsWrongNetwork } from "../hooks/useWrongNetwork"
export const TokenBalance = () => {
  const { isConnected } = useAccount()
  const isWrongNetwork = useIsWrongNetwork()
  const { data: balance } = useReadContract({
    ...ContractConfig,
    functionName: "balanceOf",
    args: ["0xCaD8610808Ba58c03f21F9Ecd3b12D5A26D58760"],
  })
  if (isConnected && !isWrongNetwork) {
    {
      return <Box>Balance: {balance?.toString()}</Box>
    }
  }
}
