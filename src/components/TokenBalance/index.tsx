"use client"
import { useReadContract, useAccount } from "wagmi"
import { ContractConfig } from "../ContractConfig "
import { Box } from "@mui/material"
import { useIsWrongNetwork } from "../hooks/useWrongNetwork"
export const TokenBalance = () => {
  const { isConnected } = useAccount()
  const isWrongNetwork = useIsWrongNetwork()
  const tokenAddress = process.env.NEXT_PUBLIC_ERC20_TOKEN_ADDRESS
  const { data: balance } = useReadContract({
    ...ContractConfig,
    functionName: "balanceOf",
    args: [tokenAddress],
  })
  if (isConnected && !isWrongNetwork) {
    {
      return <Box>Balance: {balance?.toString()}</Box>
    }
  }
}
