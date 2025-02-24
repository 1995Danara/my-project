"use client"
import React from "react"
import { useAccount, useBalance } from "wagmi"
import { Box, Typography } from "@mui/material"

import { useIsWrongNetwork } from "src/hooks/useWrongNetwork"
import { TARGET_NETWORK_ID } from "networkConfig"
import { formatNumber } from "src/utils/formatters"

export const Balance = () => {
  const { address, isConnected } = useAccount()
  const isWrongNetwork = useIsWrongNetwork()

  const { data: balance } = useBalance({
    address,
    chainId: TARGET_NETWORK_ID,
  })

  const formattedBalance = formatNumber(balance?.value)

  if (isConnected && !isWrongNetwork) {
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
}
