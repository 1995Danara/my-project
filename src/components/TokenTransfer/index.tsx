"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useAccount, useWriteContract, useReadContract } from "wagmi"
import { parseUnits } from "viem"
import { Button, Box } from "@mui/material"

import { ContractConfig } from "@config/contract-config"
import { AddressInput } from "@components/Input/AddressInput"
import { AmountInput } from "@components/Input/AmountInput"
import { formatNumber } from "@utils/formatters"
import {
  setAmount,
  setRecipientAddress,
  setFormattedAmount,
  setApproveStatus,
} from "src/store/slices"
import { RootState } from "@store/index"

export const TokenTransfer = () => {
  const dispatch = useDispatch()

  const { amount, recipientAddress, approveStatus, formattedAmount } =
    useSelector((state: RootState) => state.tokenTransfer)

  const { address, isConnected } = useAccount()
  const { writeContract } = useWriteContract()

  const { data: balanceData } = useReadContract({
    address: ContractConfig.address,
    abi: ContractConfig.abi,
    functionName: "balanceOf",
    args: [address! as `0x${string}`],
  })

  const { data: allowanceData, refetch } = useReadContract({
    address: ContractConfig.address,
    abi: ContractConfig.abi,
    functionName: "allowance",
    args: [address! as `0x${string}`, recipientAddress as `0x${string}`],
  })

  const { data: decimals } = useReadContract({
    abi: ContractConfig.abi,
    address: ContractConfig.address,
    functionName: "decimals",
  })

  const handleApprove = async () => {
    if (!isConnected) return
    if (!amount || !recipientAddress) {
      return
    }
    try {
      const amountValue = parseUnits(amount, decimals!)
      await writeContract({
        address: ContractConfig.address,
        abi: ContractConfig.abi,
        functionName: "approve",
        args: [recipientAddress as `0x${string}`, amountValue],
      })
      dispatch(setApproveStatus(true))
      refetch()
    } catch (error) {
      console.error("error:", error)
    }
  }

  const handleTransfer = async () => {
    if (!isConnected) return
    if (!amount || !recipientAddress) {
      return
    }
    try {
      const amountValue = parseUnits(amount, decimals!)
      await writeContract({
        address: ContractConfig.address,
        abi: ContractConfig.abi,
        functionName: "transfer",
        args: [recipientAddress as `0x${string}`, amountValue],
      })
      dispatch(setApproveStatus(false))
    } catch (error) {
      console.error("error:", error)
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
    const inputValue = e.target.value
    dispatch(setAmount(inputValue))

    const amountValue = parseUnits(inputValue, 18)
    const formattedValue = formatNumber(amountValue, { decimals })
    dispatch(setFormattedAmount(formattedValue!))
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
      <AmountInput value={amount} onChange={handleAmountChange} />
      {formattedAmount}
      <AddressInput
        value={recipientAddress}
        onChange={handleRecipientAddressChange}
      />
      <Button
        sx={{
          borderRadius: "30px",
        }}
        size="large"
        variant="contained"
        color="secondary"
        onClick={approveStatus ? handleTransfer : handleApprove}
      >
        {approveStatus ? "Transfer" : "Approve"}
      </Button>
    </Box>
  )
}
