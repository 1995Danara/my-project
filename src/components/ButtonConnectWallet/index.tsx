"use client"
import { useState } from "react"
import { Box } from "@mui/material"
import { Button } from "@mui/material"

import { useWalletConnect } from "@/hooks/useWalletConnect"
import { ModalDialog } from "@/ModalDialog"
import { trimAddress } from "utils/trimAddress"

export const ButtonConnectWallet = () => {
  const [isModal, setIsModal] = useState(false)
  const onConnect = () => setIsModal(false)
  const onDisconnect = () => setIsModal(false)

  const {
    address,
    isConnected,
    isWrongNetwork,
    handleConnect,
    isConnecting,
    handleDisconnect,
    handleSwitchNetwork,
  } = useWalletConnect(onConnect, onDisconnect)

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
          onClick: handleConnect,
        }
      case isWrongNetwork:
        return {
          text: "Wrong network",
          onClick: () => setIsModal(true),
        }
      default:
        return {
          text: trimAddress(address!),
          onClick: () => setIsModal(true),
        }
    }
  }

  const { text, onClick } = getButtonProps()

  return (
    <Box>
      <Button variant="contained" onClick={onClick}>
        {text}
      </Button>
      <ModalDialog
        open={isModal}
        onClose={() => setIsModal(false)}
        wrongNetwork={isWrongNetwork}
        onSwitchNetwork={handleSwitchNetwork}
        onDisconnect={handleDisconnect}
        address={address}
      />
    </Box>
  )
}
