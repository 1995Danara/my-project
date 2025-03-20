"use client"

import { useEffect, useState } from "react"
import { toast } from "react-toastify"

import { useTokenInfo } from "@hooks/useTokenInfo"
import { useTokenActions } from "@hooks/useTokenActions"
import { TokenTransferHandlerProps } from "./interface"

export const TokenTransferHandler = ({
  address,
  amount,
}: TokenTransferHandlerProps) => {
  const {
    tokenBalance,
    allowance,
    decimals,
    refetchAllowance,
    refetchTokenBalance,
  } = useTokenInfo(address)
  const { approve, transfer, transactionProgress } = useTokenActions()
  const [approvalComplete, setApprovalComplete] = useState(false)
  const [readyForTransfer, setReadyForTransfer] = useState(false)
  const missingAllowance =
    allowance && Number(amount) > Number(allowance)
      ? Number(amount) - Number(allowance)
      : 0

  useEffect(() => {
    if (address && amount) {
      refetchAllowance()
    }

    if (
      amount &&
      tokenBalance &&
      allowance &&
      Number(amount) <= Number(allowance)
    ) {
      setApprovalComplete(true)
      setReadyForTransfer(true)
    } else {
      setApprovalComplete(false)
      setReadyForTransfer(false)
    }
  }, [amount, tokenBalance, allowance, address, refetchAllowance])

  const handleApprove = async () => {
    if (amount && address && decimals) {
      const toastId = "approveTransaction"
      toast.info("Transaction in progress...", {
        toastId,
        isLoading: true,
        autoClose: false,
      })
      try {
        await approve(amount, address, toastId)
        setApprovalComplete(true)
      } catch (error) {
        console.error("Error during approval:", error)
        toast.update(toastId, {
          render: "Approve failed!",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        })
      } finally {
        refetchAllowance()
      }
    }
  }

  const handleTransfer = async () => {
    if (amount && address && decimals) {
      const toastId = "transferTransaction"
      setTimeout(() => {
        toast.info("Transaction in progress...", {
          toastId,
          isLoading: true,
          autoClose: false,
        })
      }, 200)
      try {
        await transfer(amount, address, toastId)
        toast.update(toastId, {
          render: "Transfer successful!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        })
        setReadyForTransfer(true)
      } catch (error) {
        console.error("Error during transfer:", error)
        toast.update(toastId, {
          render: "Transfer failed!",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        })
      } finally {
        refetchTokenBalance()
      }
    }
  }

  return {
    approvalComplete,
    readyForTransfer,
    transactionProgress,
    missingAllowance,
    handleApprove,
    handleTransfer,
  }
}
