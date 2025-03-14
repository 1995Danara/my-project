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
  const {
    tokenBalance,
    allowance,
    decimals,
    refetchAllowance,
    refetchTokenBalance,
  } = useTokenInfo(address)
  const { approve, transfer, transactionProgress } = useTokenActions()

  useEffect(() => {
    if (address && amount) {
      refetchAllowance()
    }
    if (amount && tokenBalance && allowance && BigInt(amount) < allowance) {
      setIsButtonApprove(true)
    } else {
      setIsButtonApprove(false)
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
        await approve(amount!, address, decimals)
        toast.update(toastId, {
          render: "Approve successful!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        })
        setAmount("")
        setAddress("")
      } catch (error) {
        console.error("Error during approval:", error)
        toast.update(toastId, {
          render: "Approve failed!",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        })
      }
    }
  }
  const handleTransfer = async () => {
    if (amount && address && decimals) {
      const toastId = "transferTransaction"
      toast.info("Transaction in progress...", {
        toastId,
        isLoading: true,
        autoClose: false,
      })

      try {
        await transfer(amount, address, decimals)
        toast.update(toastId, {
          render: "Transfer successful!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        })
        setAmount("")
        setAddress("")
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
      <ToastContainer position="top-right" autoClose={2000} />
    </Box>
  )
}
