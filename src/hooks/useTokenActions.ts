import { useState } from "react"
import { useWriteContract } from "wagmi"
import { parseUnits } from "viem"

import { TokenContractConfig } from "@config/contract-config"

export const useTokenActions = () => {
  const [transactionProgress, setTransactionProgress] = useState(false)
  const { writeContract } = useWriteContract()

  const approve = async (amount: string, address: string, decimals: number) => {
    try {
      const amountValue = parseUnits(amount, decimals)
      await writeContract({
        address: TokenContractConfig.address,
        abi: TokenContractConfig.abi,
        functionName: "approve",
        args: [address as `0x${string}`, amountValue],
      })
    } catch (error) {
      console.error("error:", error)
    } finally {
      setTransactionProgress(false)
    }
  }

  const transfer = async (
    amount: string,
    recipientAddress: string,
    decimals: number,
  ) => {
    try {
      setTransactionProgress(true)
      const amountValue = parseUnits(amount, decimals)
      await writeContract({
        address: TokenContractConfig.address,
        abi: TokenContractConfig.abi,
        functionName: "transfer",
        args: [recipientAddress as `0x${string}`, amountValue],
      })
    } catch (error) {
      console.error("error:", error)
    } finally {
      setTransactionProgress(false)
    }
  }

  return { approve, transfer, transactionProgress }
}
