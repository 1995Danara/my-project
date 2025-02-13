"use client"
import React from "react"
import { useAccount, useBalance } from "wagmi"

import { TARGET_NETWORK_ID } from "../../../networkConfig"
import { Box, Typography } from "@mui/material"
import { formatUnits } from "viem"
export const Balance = () => {
  const { address, isConnected } = useAccount()
  const { data: balance } = useBalance({
    address,
    chainId: TARGET_NETWORK_ID,
  })

  const formattedBalance = balance
    ? `${Number(formatUnits(balance.value, 18)).toFixed(4)} ETH`
    : "N/A"
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
      }}
    >
      <Box>
        {isConnected ? (
          <Typography variant="body1" sx={{ marginRight: "10px" }}>
            Balance: {formattedBalance}
          </Typography>
        ) : (
          <Typography variant="body1" sx={{ marginRight: "10px" }}>
            Balance: N/A
          </Typography>
        )}
      </Box>
    </Box>
  )
}
