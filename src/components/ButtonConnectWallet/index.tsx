"use client"
import { Box } from "@mui/material"
import { Button } from "@mui/material"
import { ModalDialog } from "../ModalDialog"
import { useWalletConnect } from "../hooks/useWalletConnect"
import { trimAddress } from "../utilts.ts/trimAddress"

export const ButtonConnectWallet = () => {
  const {
    address,
    isConnected,
    isWrongNetwork,
    handleConnect,
    handleDisconnect,
    handleSwitchNetwork,
    isModal,
    setIsModal,
  } = useWalletConnect()

  const getButtonProps = () => {
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
