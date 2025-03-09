"use client"
import { useReadContract, useAccount } from "wagmi"
import { Box, Typography } from "@mui/material"

import { useIsWrongNetwork } from "@hooks/useWrongNetwork"
import { ContractConfig } from "@config/contract-config"
import { formatNumber } from "@utils/formatters"

export const TokenBalance = () => {
  const { isConnected, address } = useAccount()
  const isWrongNetwork = useIsWrongNetwork()

  const { data: balance } = useReadContract({
    abi: ContractConfig.abi,
    address: ContractConfig.address,
    functionName: "balanceOf",
    args: [address!],
  })

  const formattedBalance = formatNumber(balance)

  if (isConnected && !isWrongNetwork) {
    {
      return (
        <Box>
          <Typography variant="body1" sx={{ marginRight: "10px" }}>
            Balance: {formattedBalance}
          </Typography>
        </Box>
      )
    }
  }
}
