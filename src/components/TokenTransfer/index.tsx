"use client"

import { useEffect, useState } from "react"
import { Button, Box, TextField } from "@mui/material"
import { toast, ToastContainer } from "react-toastify"

import { useTokenInfo } from "@hooks/useTokenInfo"
import { useTokenActions } from "@hooks/useTokenActions"
import { TokenTransferDialog } from "@components/TokenTransferDialog"

export const TokenTransfer = () => {
  const [amount, setAmount] = useState("")
  const [address, setAddress] = useState("")
  const [openModal, setOpenModal] = useState(false)
  const {
    tokenBalance,
    allowance,
    decimals,
    refetchAllowance,
    refetchTokenBalance,
  } = useTokenInfo(address)
  const { approve, transfer, transactionProgress } = useTokenActions()
  const [isButtonApprove, setIsButtonApprove] = useState(false)
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
        await approve(amount, address, toastId)
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

      <Button
        variant="contained"
        color="secondary"
        onClick={() => setOpenModal(true)}
        disabled={!amount || !address || transactionProgress}
      >
        Verify Approval
      </Button>
      <TokenTransferDialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        amount={amount}
        address={address}
        isButtonApprove={isButtonApprove}
        handleApprove={handleApprove}
        handleTransfer={handleTransfer}
        transactionProgress={transactionProgress}
        missingAllowance={missingAllowance}
      />
      <ToastContainer position="top-right" autoClose={2000} />
    </Box>
  )
}
