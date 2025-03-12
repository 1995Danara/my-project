"use client"
import { Box, Typography, Button } from "@mui/material"
import { useState } from "react"

import { Header } from "@components/Header"
import { MetaMaskTokenButton } from "@components/MetaMaskTokenButton "
import { TokenTransfer } from "@components/TokenTransfer"
import { WalletDialog } from "@components/WalletDialog"
import { useWalletConnect } from "@hooks/useWalletConnect"
import { TARGET_NETWORK_ID } from "networkConfig"
import { useBalance, useReadContract } from "wagmi"
import { formatNumber } from "@utils/formatters"
import { TokenContractConfig } from "@config/contract-config"

export function HomePage() {
  const { address } = useWalletConnect()

  const [openDialog, setOpenDialog] = useState(false)
  const { data: balance } = useBalance({
    address,
    chainId: TARGET_NETWORK_ID,
  })

  const { data: tokenBalance } = useReadContract({
    abi: TokenContractConfig.abi,
    address: TokenContractConfig.address,
    functionName: "balanceOf",
    args: [address!],
  })

  const { data: tokenSymbol } = useReadContract({
    abi: TokenContractConfig.abi,
    address: TokenContractConfig.address,
    functionName: "symbol",
  })

  const formattedTokenBalance = tokenBalance ? formatNumber(tokenBalance) : ""
  const formattedTokenSymbol = tokenSymbol ? tokenSymbol : ""

  const handleOpenDialog = () => setOpenDialog(true)
  const handleCloseDialog = () => setOpenDialog(false)

  const formattedBalance = balance ? formatNumber(balance.value) : ""

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
            variant="contained"
            color="secondary"
            size="medium"
            onClick={handleOpenDialog}
          >
            Connect Wallet
          </Button>
        </Box>
      ) : (
        <>
          <Typography variant="body1" sx={{ marginRight: "10px" }}>
            Balance: {formattedBalance} ETH
          </Typography>
          <Typography variant="body1" sx={{ marginRight: "10px" }}>
            Balance: {formattedTokenBalance} {formattedTokenSymbol}
          </Typography>
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
