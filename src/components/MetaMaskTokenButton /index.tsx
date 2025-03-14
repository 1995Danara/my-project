"use client"
import { Button } from "@mui/material"
import { useReadContract } from "wagmi"

import { TokenContractConfig } from "@config/contract-config"
import { addTokenMetaMask } from "@utils/utils"

export const MetaMaskTokenButton = () => {
  const tokenAddress = TokenContractConfig.address
  const tokenSymbol = "MTK"

  const { data: decimals } = useReadContract({
    address: tokenAddress,
    abi: TokenContractConfig.abi,
    functionName: "decimals",
  })

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={() => addTokenMetaMask(tokenAddress, decimals!, tokenSymbol)}
    >
      Add a token to MetaMask
    </Button>
  )
}
