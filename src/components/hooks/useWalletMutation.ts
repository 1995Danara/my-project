import { useMutation } from "@tanstack/react-query"
import { injected } from "wagmi/connectors"
import { useConnect } from "wagmi"

export const useWalletMutation = (onConnect: () => void) => {
  const { connect } = useConnect()
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
  return {
    connectMutation,
  }
}
