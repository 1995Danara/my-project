import { TARGET_NETWORK_ID } from "../../../networkConfig"
import { useMutation } from "@tanstack/react-query"
import { injected } from "wagmi/connectors"
import { useConnect, useDisconnect, useSwitchChain } from "wagmi"

export const useWalletMutation = (
  onConnect: () => void,
  onDisconnect: () => void,
) => {
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()
  const { switchChain } = useSwitchChain()

  const connectMutation = useMutation({
    mutationFn: async () => {
      await connect({ connector: injected() })
    },
    onSuccess: () => {
      onConnect()
    },
    onError: (error: Error) => {
      console.error("Connection error:", error)
      onConnect()
    },
  })

  const switchNetworkMutation = useMutation({
    mutationFn: async () => {
      if (switchChain) {
        await switchChain({ chainId: TARGET_NETWORK_ID })
      }
    },
    onSuccess: () => {},
    onError: (error: Error) => {
      console.error("Network switching error:", error)
    },
  })
  const disconnectMutation = useMutation({
    mutationFn: async () => {
      await disconnect()
      onDisconnect()
    },
    onSuccess: () => {},
    onError: (error: Error) => {
      console.error("Shutdown error:", error)
    },
  })
  return {
    connectMutation,
    switchNetworkMutation,
    disconnectMutation,
  }
}
