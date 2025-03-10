"use client"
import { Box, Typography, Button } from "@mui/material"
import { useState } from "react"

import { Balance } from "@components/Balance"
import { TokenBalance } from "@components/TokenBalance"
import { Header } from "@components/Header"
import { MetaMaskTokenButton } from "@components/MetaMaskTokenButton "
import { TokenTransfer } from "@components/TokenTransfer"
import { WalletDialog } from "@components/WalletDialog"
import { useWalletConnect } from "@hooks/useWalletConnect"

export function HomePage() {
  const { address } = useWalletConnect()

  const [openDialog, setOpenDialog] = useState(false)

  const handleOpenDialog = () => setOpenDialog(true)
  const handleCloseDialog = () => setOpenDialog(false)

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
      {!address ? (
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 6,
            minWidth: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 400,
          }}
        >
          <Button
            size="large"
            variant="contained"
            color="secondary"
            onClick={handleOpenDialog}
          >
            Connect Wallet
          </Button>
        </Box>
      ) : (
        <>
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
        </>
      )}
      <WalletDialog open={openDialog} onClose={handleCloseDialog} />
    </Box>
  )
}

export default HomePage
