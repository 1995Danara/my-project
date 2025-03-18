import { useEffect, useState } from "react"
import {
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi"
import { parseUnits } from "viem"
import { toast } from "react-toastify"

import { TOKEN_CONTRACT_CONFIG } from "@config/contract-config"

export const useTokenActions = () => {
  const { writeContract, data: txData } = useWriteContract()
  const { isLoading: isWaiting } = useWaitForTransactionReceipt({
    hash: txData,
  })
  const { data: decimals } = useReadContract({
    abi: TOKEN_CONTRACT_CONFIG.abi,
    address: TOKEN_CONTRACT_CONFIG.address,
    functionName: "decimals",
  })
  const [activeTransactionToastId, setActiveTransactionToastId] = useState("")

  useEffect(() => {
    if (!isWaiting) {
      toast.update(activeTransactionToastId, {
        render: "Transaction successful!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      })
      setActiveTransactionToastId("")
    }
  }, [isWaiting])

  const approve = async (amount: string, address: string, toastId: string) => {
    if (!decimals) return
    setActiveTransactionToastId(toastId)
    try {
      const amountValue = parseUnits(amount, decimals)
      await writeContract(
        {
          address: TOKEN_CONTRACT_CONFIG.address,
          abi: TOKEN_CONTRACT_CONFIG.abi,
          functionName: "approve",
          args: [address as `0x${string}`, amountValue],
        },
        {
          onError: (error) => {
            toast.update(toastId, {
              render: `Approve failed: ${error}`,
              type: "error",
              isLoading: false,
              autoClose: 2000,
            })
          },
        },
      )
    } catch (error) {
      console.error("error:", error)
    }
  }

  const transfer = async (
    amount: string,
    recipientAddress: string,
    toastId: string,
  ) => {
    if (!decimals) return
    setActiveTransactionToastId(toastId)
    try {
      const amountValue = parseUnits(amount, decimals)
      await writeContract(
        {
          address: TOKEN_CONTRACT_CONFIG.address,
          abi: TOKEN_CONTRACT_CONFIG.abi,
          functionName: "transfer",
          args: [recipientAddress as `0x${string}`, amountValue],
        },
        {
          onError: (error) => {
            toast.update(toastId, {
              render: `Transfer failed: ${error}`,
              type: "error",
              isLoading: false,
              autoClose: 2000,
            })
          },
        },
      )
    } catch (error) {
      console.error("error:", error)
    }
  }

  return { approve, transfer, transactionProgress: isWaiting }
}
