"use client"
import { Button, Modal, Box } from "@mui/material"

import { WalletDialogProps } from "./interface"
import { useWalletConnect } from "src/hooks/useWalletConnect"

export const WalletDialog = ({ open, onClose }: WalletDialogProps) => {
  const {
    address,
    isWrongNetwork,
    isConnecting,
    handleConnect,
    handleDisconnect,
    handleSwitchNetwork,
  } = useWalletConnect()
  const modalRender = () => {
    if (isWrongNetwork) {
      return (
        <>
          <p>Wrong network</p>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSwitchNetwork}
          >
            Switch Network
          </Button>
        </>
      )
    }
    if (address) {
      return (
        <>
          <p>{address}</p>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleDisconnect}
          >
            Disconnect
          </Button>
        </>
      )
    }
    return (
      <>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleConnect}
          disabled={isConnecting}
        >
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </Button>
      </>
    )
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: 4,
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          minWidth: "300px",
        }}
      >
        {modalRender()}
      </Box>
    </Modal>
  )
}
