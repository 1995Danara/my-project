"use client"
import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi"
import { Box } from "@mui/material"
import { injected } from "wagmi/connectors"
import { Button } from "@mui/material"
import { useState, useEffect } from "react"
import { sepolia } from "wagmi/chains"
import { ModalDialog } from "../ModalDialog"

export const ButtonConnectWallet = () => {
  const { address, isConnected, chain } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()

  const [isModal, setIsModal] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const { switchChain } = useSwitchChain()

  const isWrongNetwork = chain?.id !== sepolia.id

  const handleConnect = () => {
    connect({ connector: injected() })
    setIsModal(true)
  }

  const handleDisconnect = () => {
    disconnect()
    setIsModal(false)
  }
  const handleSwitchNetwork = () => {
    if (switchChain) {
      switchChain({ chainId: sepolia.id })
    }
  }

  useEffect(() => {
    if (isConnected) {
      setIsModal(false)
    }
  }, [isConnected])

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <Box>
      {isConnected ? (
        isWrongNetwork ? (
          <Button variant="contained" onClick={() => setIsModal(true)}>
            Wrong network
          </Button>
        ) : (
          <Button variant="contained" onClick={() => setIsModal(true)}>
            {address?.slice(0, 6)}...{address?.slice(-5)}
          </Button>
        )
      ) : (
        <Button variant="contained" onClick={handleConnect}>
          Connect Wallet
        </Button>
      )}
      <ModalDialog
        open={isModal}
        address={address}
        onClose={() => setIsModal(false)}
        onDisconnect={handleDisconnect}
        wrongNetwork={isWrongNetwork}
        onSwitchNetwork={handleSwitchNetwork}
      />
    </Box>
  )
}
