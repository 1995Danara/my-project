"use client"
import { Button, Modal, Box, Typography } from "@mui/material"

import { WalletDialogProps } from "./interface"
import { useWalletConnect } from "@hooks/useWalletConnect"
import { trimAddress } from "@utils/trimAddress"

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
    switch (true) {
      case !address:
        return (
          <>
            <Typography variant="h6" sx={{ marginBottom: "16px" }}>
              Connect Wallet
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleConnect}
              disabled={isConnecting}
              sx={{ marginBottom: "16px" }}
            >
              {isConnecting ? "Connecting..." : "MetaMask"}
            </Button>
          </>
        )
      case isWrongNetwork:
        return (
          <>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSwitchNetwork}
            >
              Switch Network
            </Button>
            <p>{trimAddress(address)}</p>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleDisconnect}
            >
              Disconnect
            </Button>
          </>
        )
      default:
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
