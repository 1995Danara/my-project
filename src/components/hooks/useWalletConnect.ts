import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi"
import { injected } from "wagmi/connectors"
import { sepolia } from "wagmi/chains"
import { useState, useEffect } from "react"
import { useIsWrongNetwork } from "./useWrongNetwork"

export const useWalletConnect = () => {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()
  const { switchChain } = useSwitchChain()

  const isWrongNetwork = useIsWrongNetwork()

  const [isModal, setIsModal] = useState(false)

  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = async () => {
    if (isConnecting) return
    try {
      setIsModal(true)
      setIsConnecting(true)
      await connect({ connector: injected() })
    } catch (error) {
      console.error("Ошибка при подключении:", error)
    }
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
    if (isConnected && !isConnecting) {
      setIsModal(false)
    }
  }, [isConnected, isConnecting])

  return {
    address,
    isConnected,
    isWrongNetwork,
    handleConnect,
    handleDisconnect,
    handleSwitchNetwork,
    isModal,
    setIsModal,
  }
}
