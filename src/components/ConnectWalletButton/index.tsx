"use client"
import { useEffect, useState } from "react"
import { Button, SvgIcon, useTheme } from "@mui/material"

import { useWalletConnect } from "@hooks/useWalletConnect"
import { WalletDialog } from "@components/WalletDialog"
import { trimAddress } from "@utils/trimAddress"
import Wallet from "@assets/icons/wallet_icon.svg"

export const ConnectWalletButton = () => {
  const theme = useTheme()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const { address, isConnected, isWrongNetwork, isConnecting } =
    useWalletConnect()

  useEffect(() => {
    if (address && !isWrongNetwork) {
      setIsModalOpen(false)
    }
  }, [address, isWrongNetwork])

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
    <>
      <Button
        variant="contained"
        color="secondary"
        sx={{ height: "46px" }}
        onClick={onClick}
        disabled={disabled}
      >
        {text}
      </Button>
      <WalletDialog open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
