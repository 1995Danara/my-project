"use client"

import { useState } from "react"
import { Button, Box, TextField } from "@mui/material"
import { ToastContainer } from "react-toastify"

import { TokenTransferDialog } from "@components/TokenTransferDialog"
import { TokenTransferHandler } from "@components/TokenTransferHandler "

export const TokenTransferForm = () => {
  const [amount, setAmount] = useState("")
  const [address, setAddress] = useState("")
  const [openModal, setOpenModal] = useState(false)
  const {
    approvalComplete,
    readyForTransfer,
    transactionProgress,
    missingAllowance,
    handleApprove,
    handleTransfer,
  } = TokenTransferHandler({ address, amount })

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value)
  }

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value)
  }

  const resetInputs = () => {
    setAmount("")
    setAddress("")
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
        placeholder="Enter amount"
      />
      <TextField
        value={address}
        onChange={handleAddressChange}
        placeholder="Enter recipient address"
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
        onClose={() => {
          setOpenModal(false)
          resetInputs()
        }}
        approvalComplete={approvalComplete}
        readyForTransfer={readyForTransfer}
        transactionProgress={transactionProgress}
        missingAllowance={missingAllowance}
        handleApprove={handleApprove}
        handleTransfer={handleTransfer}
      />
      <ToastContainer position="top-right" autoClose={2000} />
    </Box>
  )
}
