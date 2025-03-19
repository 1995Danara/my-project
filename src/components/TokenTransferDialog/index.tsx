"use client"

import {
  Modal,
  Box,
  Button,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material"

import { TokenTransferDialogProps } from "./interface"

export const TokenTransferDialog = ({
  open,
  onClose,
  amount,
  address,
  handleApprove,
  handleTransfer,
  isButtonApprove,
  transactionProgress,
  missingAllowance,
}: TokenTransferDialogProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: 4,
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          minWidth: "300px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: "column",
          }}
        >
          <FormControlLabel
            control={<Checkbox checked={isButtonApprove} disabled={true} />}
            label="Approval Complete"
          />
          <FormControlLabel
            control={<Checkbox checked={isButtonApprove} disabled={true} />}
            label="Ready for Transfer"
          />
        </Box>
        {missingAllowance > 0 && (
          <Typography sx={{ color: "red", marginTop: 2 }}>
            You need {missingAllowance} more tokens for approval.
          </Typography>
        )}
        <Box sx={{ marginTop: 2 }}>
          {!isButtonApprove ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleApprove}
              disabled={
                !amount ||
                !address ||
                transactionProgress ||
                missingAllowance > 0
              }
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
        </Box>
      </Box>
    </Modal>
  )
}
