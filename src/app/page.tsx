"use client"
import { Box, Typography } from "@mui/material"

import { Balance } from "@components/Balance"
import { TokenBalance } from "@components/TokenBalance"
import { Header } from "@components/Header"
import { MetaMaskTokenButton } from "@components/MetaMaskTokenButton "
import { TokenTransfer } from "@components/TokenTransfer"

export function HomePage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Header />
      <TokenBalance />
      <Balance />
      <Box
        sx={{
          backgroundColor: "white",
          padding: 4,
          borderRadius: 2,
          boxShadow: 6,
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          minWidth: 600,
          justifyContent: "center",
          minHeight: 400,
          gap: 4,
        }}
      >
        <Typography variant="h6">Transfer of tokens</Typography>
        <TokenTransfer />
        <MetaMaskTokenButton />
      </Box>
    </Box>
  )
}

export default HomePage
