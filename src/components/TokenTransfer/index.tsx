"use client"

import { useEffect, useState } from "react"
import { Button, Box, TextField } from "@mui/material"
import { toast, ToastContainer } from "react-toastify"

import { useTokenInfo } from "@hooks/useTokenInfo"
import { useTokenActions } from "@hooks/useTokenActions"

export const TokenTransfer = () => {
  const [amount, setAmount] = useState("")
  const [address, setAddress] = useState("")
  const [isButtonApprove, setIsButtonApprove] = useState(false)
  const { tokenBalance, allowance, decimals, refetchAllowance } =
    useTokenInfo(address)
  const { approve, transfer, transactionProgress } = useTokenActions()

  useEffect(() => {
    if (address && amount) {
      refetchAllowance()
    }
    if (amount && tokenBalance && allowance && tokenBalance > allowance) {
      setIsButtonApprove(true)
    } else {
      setIsButtonApprove(false)
    }
  }, [amount, tokenBalance, allowance, address, refetchAllowance])

  const handleApprove = async () => {
    if (amount && address && decimals) {
      try {
        toast.info("Transaction in progress...")
        await approve(amount, address, decimals)
        toast.success("Approve successful!")
        setAmount("")
        setAddress("")
      } catch (error) {
        console.error("Error during approval:", error)
        toast.error("Approve failed! ")
      }
    }
  }

  const handleTransfer = async () => {
    if (amount && address && decimals) {
      try {
        toast.info("Transaction in progress...")
        await transfer(amount, address, decimals)
        toast.success("Transfer successful!")
        setAmount("")
        setAddress("")
      } catch (error) {
        console.error("Error during transfer:", error)
        toast.error("Transfer failed!")
      }
    }
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value)
  }

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value)
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
      <TextField
        value={amount}
        onChange={handleAmountChange}
        placeholder="Please, enter amount"
      />
      <TextField
        value={address}
        onChange={handleAddressChange}
        placeholder="Please, enter recipient address"
      />

      {!isButtonApprove ? (
        <Button
          variant="contained"
          color="primary"
          onClick={handleApprove}
          disabled={!amount || !address || transactionProgress}
        >
          Approve
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={handleTransfer}
          disabled={!amount || !address || transactionProgress}
        >
          Transfer
        </Button>
      )}
      <ToastContainer position="bottom-left" autoClose={2000} />
    </Box>
  )
}
