import { useAccount } from "wagmi"
import { useWalletMutation } from "./useWalletMutation"
import { useIsWrongNetwork } from "./useWrongNetwork"

export const useWalletConnect = (
  onConnect: () => void,
  onDisconnect: () => void,
) => {
  const { address, isConnected } = useAccount()

  const isWrongNetwork = useIsWrongNetwork()
  const { connectMutation, switchNetworkMutation, disconnectMutation } =
    useWalletMutation(onConnect, onDisconnect)

  const handleConnect = async () => {
    onConnect()
    try {
      await connectMutation.mutateAsync()
    } catch (error) {
      console.error("Connection error:", error)
    }
  }

  const handleDisconnect = async () => {
    onConnect()
    try {
      await disconnectMutation.mutateAsync()
    } catch (error) {
      console.error("Shutdown error:", error)
    }
  }

  const handleSwitchNetwork = async () => {
    onConnect()
    try {
      await switchNetworkMutation.mutateAsync()
    } catch (error) {
      console.error("Network switching error:", error)
    }
  }

  return {
    address,
    isConnected,
    isWrongNetwork,
    handleConnect,
    handleDisconnect,
    handleSwitchNetwork,
  }
}
