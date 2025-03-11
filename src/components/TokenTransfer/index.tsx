"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useAccount, useWriteContract, useReadContract } from "wagmi"
import { parseUnits } from "viem"
import { Button, Box } from "@mui/material"

import { TokenContractConfig } from "@config/contract-config"
import { Input } from "@components/Input"
import {
  setAmount,
  setRecipientAddress,
  setApproveStatus,
  setTransactionProgress,
} from "src/store/slices"
import { RootState } from "@store/index"

export const TokenTransfer = () => {
  const dispatch = useDispatch()

  const { amount, recipientAddress, approveStatus, transactionProgress } =
    useSelector((state: RootState) => state.tokenTransfer)

  const { address, isConnected } = useAccount()
  const { writeContract } = useWriteContract()

  const { data: balanceData } = useReadContract({
    address: TokenContractConfig.address,
    abi: TokenContractConfig.abi,
    functionName: "balanceOf",
    args: [address! as `0x${string}`],
  })

  const { data: allowanceData, refetch } = useReadContract({
    address: TokenContractConfig.address,
    abi: TokenContractConfig.abi,
    functionName: "allowance",
    args: [address! as `0x${string}`, recipientAddress as `0x${string}`],
  })

  const { data: decimals } = useReadContract({
    abi: TokenContractConfig.abi,
    address: TokenContractConfig.address,
    functionName: "decimals",
  })

  const handleApprove = async () => {
    if (!amount || !recipientAddress || !isConnected || transactionProgress) {
      return
    }
    try {
      dispatch(setTransactionProgress(true))
      const amountValue = parseUnits(amount, decimals!)
      await writeContract({
        address: TokenContractConfig.address,
        abi: TokenContractConfig.abi,
        functionName: "approve",
        args: [recipientAddress as `0x${string}`, amountValue],
      })
      dispatch(setApproveStatus(true))
      refetch()
    } catch (error) {
      console.error("error:", error)
    } finally {
      dispatch(setTransactionProgress(false))
    }
  }

  const handleTransfer = async () => {
    if (!amount || !recipientAddress || !isConnected || transactionProgress) {
      return
    }
    try {
      dispatch(setTransactionProgress(true))
      const amountValue = parseUnits(amount, decimals!)
      await writeContract({
        address: TokenContractConfig.address,
        abi: TokenContractConfig.abi,
        functionName: "transfer",
        args: [recipientAddress as `0x${string}`, amountValue],
      })
      dispatch(setApproveStatus(false))
    } catch (error) {
      console.error("error:", error)
    } finally {
      dispatch(setTransactionProgress(false))
    }
  }

  useEffect(() => {
    if (allowanceData && amount && balanceData && decimals) {
      const allowance = allowanceData
      const balanceValue = balanceData
      const amountValue = parseUnits(amount, decimals)

      if (balanceValue >= amountValue && allowance >= amountValue) {
        dispatch(setApproveStatus(false))
      } else {
        dispatch(setApproveStatus(true))
      }
    }
  }, [balanceData, allowanceData, amount, decimals, dispatch])

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setAmount(e.target.value))
  }

  const handleRecipientAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    dispatch(setRecipientAddress(e.target.value))
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        justifyContent: "center",
        gap: 2,
      }}
    >
      <Input value={amount} onChange={handleAmountChange} />
      <Input value={recipientAddress} onChange={handleRecipientAddressChange} />
      <Button
        variant="contained"
        color="secondary"
        onClick={approveStatus ? handleTransfer : handleApprove}
        disabled={transactionProgress}
      >
        {approveStatus ? "Transfer" : "Approve"}
      </Button>
    </Box>
  )
}
