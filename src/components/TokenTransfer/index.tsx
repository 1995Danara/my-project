"use client"

import { useEffect, useState } from "react"
import { Button, Box } from "@mui/material"

import { Input } from "@components/Input"
import { useTokenInfo } from "@hooks/useTokenInfo"
import { useTokenActions } from "@hooks/useTokenActions"

export const TokenTransfer = () => {
  const [amount, setAmount] = useState("")
  const [address, setAddress] = useState("")
  const [isButtonApprove, setIsButtonApprove] = useState(false)
  const { balanceData, allowanceData, decimals, refetchAllowance } =
    useTokenInfo(address)
  const { approve, transfer, transactionProgress } = useTokenActions()

  useEffect(() => {
    if (address && amount) {
      refetchAllowance()
    }
    if (amount && balanceData! > allowanceData!) {
      setIsButtonApprove(true)
    } else {
      setIsButtonApprove(false)
    }
  }, [amount, balanceData, decimals, allowanceData, address, refetchAllowance])

  const handleApprove = () => {
    if (amount && address && decimals) {
      approve(amount, address, decimals)
    }
  }

  const handleTransfer = () => {
    if (amount && address && decimals) {
      transfer(amount, address, decimals)
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
      <Input
        value={amount}
        onChange={handleAmountChange}
        placeholder="Please,enter amount"
      />
      <Input
        value={address}
        onChange={handleAddressChange}
        placeholder="Please,enter recipient address"
      />

      {isButtonApprove ? (
        <Button
          variant="contained"
          color="primary"
          onClick={handleApprove}
          disabled={!amount || !address || !decimals}
        >
          Approve
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={handleTransfer}
          disabled={!amount || !address || !decimals || !transactionProgress}
        >
          Transfer
        </Button>
      )}
    </Box>
  )
}
