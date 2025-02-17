import { useAccount } from "wagmi"
import { useDisconnect, useSwitchChain } from "wagmi"

import { useWalletMutation } from "./useWalletMutation"
import { useIsWrongNetwork } from "./useWrongNetwork"
import { TARGET_NETWORK_ID } from "networkConfig"

export const useWalletConnect = (
  onConnect: () => void,
  onDisconnect: () => void,
) => {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { switchChain } = useSwitchChain()
  const isWrongNetwork = useIsWrongNetwork()
  const { connectMutation } = useWalletMutation(onConnect)

  const isConnecting = connectMutation.isPending

  const handleConnect = async () => {
    onConnect()
    try {
      await connectMutation.mutateAsync()
    } catch (error) {
      console.error("Connection error:", error)
    }
  }
  const handleDisconnect = async () => {
    try {
      await Promise.resolve(disconnect())
      onDisconnect()
    } catch (error) {
      console.error("Shutdown error:", error)
    }
  }

  const handleSwitchNetwork = async () => {
    try {
      if (switchChain) {
        await switchChain({ chainId: TARGET_NETWORK_ID })
      }
    } catch (error) {
      console.error("Network switching error:", error)
    }
  }

  return {
    address,
    isConnected,
    isWrongNetwork,
    isConnecting,
    handleConnect,
    handleDisconnect,
    handleSwitchNetwork,
  }
}
