"use client"
import { Box, Typography, Button } from "@mui/material"
import { useState, useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useBlockNumber, useBalance, useReadContract } from "wagmi"

import { Header } from "@components/Header"
import { MetaMaskTokenButton } from "@components/MetaMaskTokenButton "
import { TokenTransfer } from "@components/TokenTransfer"
import { WalletDialog } from "@components/WalletDialog"
import { useWalletConnect } from "@hooks/useWalletConnect"
import { TARGET_NETWORK_ID } from "networkConfig"
import { formatNumber } from "@utils/formatters"
import { TOKEN_CONTRACT_CONFIG } from "@config/contract-config"

export function HomePage() {
  const { address } = useWalletConnect()
  const [openDialog, setOpenDialog] = useState(false)
  const queryClient = useQueryClient()
  const { data: blockNumber } = useBlockNumber({ watch: true })
  const {
    data: balance,
    queryKey,
    refetch,
  } = useBalance({
    address,
    chainId: TARGET_NETWORK_ID,
  })

  const { data: tokenBalance } = useReadContract({
    abi: TOKEN_CONTRACT_CONFIG.abi,
    address: TOKEN_CONTRACT_CONFIG.address,
    functionName: "balanceOf",
    args: [address!],
  })

  const { data: tokenSymbol } = useReadContract({
    abi: TOKEN_CONTRACT_CONFIG.abi,
    address: TOKEN_CONTRACT_CONFIG.address,
    functionName: "symbol",
  })

  useEffect(() => {
    if (blockNumber) {
      queryClient.invalidateQueries({ queryKey })
      refetch()
    }
  }, [blockNumber, queryClient, queryKey, refetch])

  const handleOpenDialog = () => setOpenDialog(true)
  const handleCloseDialog = () => setOpenDialog(false)

  const formattedTokenBalance = tokenBalance ? formatNumber(tokenBalance) : ""
  const formattedTokenSymbol = tokenSymbol ? tokenSymbol : ""
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
