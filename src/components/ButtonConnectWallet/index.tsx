"use client"
import { useEffect, useState } from "react"
import { Box } from "@mui/material"
import { Button, Typography } from "@mui/material"

import { useWalletConnect } from "@hooks/useWalletConnect"
import { WalletDialog } from "@components/WalletDialog"
import { trimAddress } from "@utils/trimAddress"

export const ButtonConnectWallet = ({ showTitle = true }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const { address, isConnected, isWrongNetwork, isConnecting } =
    useWalletConnect()

  const getButtonProps = () => {
    if (isConnecting) {
      return {
        text: "Wallet conntecting....",
        onClick: undefined,
        disabled: true,
      }
    }
    switch (true) {
      case !isConnected:
        return {
          text: "Connect Wallet",
          onClick: () => setIsModalOpen(true),
        }
      case isWrongNetwork:
        return {
          text: "Wrong network",
          onClick: () => setIsModalOpen(true),
        }
      default:
        return {
          text: trimAddress(address!),
          onClick: () => setIsModalOpen(true),
        }
    }
  }

  const { text, onClick, disabled } = getButtonProps()

  if (!isClient) {
    return null
  }
  return (
    <Box>
      {showTitle && (
        <Typography variant="h5" sx={{ fontSize: "32px", fontWeight: "bold" }}>
          {isConnected ? "Connected" : "Connect Wallet"}
        </Typography>
      )}
      <Button
        size="large"
        variant="contained"
        color="secondary"
        onClick={onClick}
        disabled={disabled}
      >
        {text}
      </Button>
      <WalletDialog open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Box>
  )
}
