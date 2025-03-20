import {
  Modal,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material"

export const TokenTransferDialog = ({
  open,
  onClose,
  approvalComplete,
  readyForTransfer,
  transactionProgress,
  missingAllowance,
  handleApprove,
  handleTransfer,
}: {
  open: boolean
  onClose: () => void
  approvalComplete: boolean
  readyForTransfer: boolean
  transactionProgress: boolean
  missingAllowance: number
  handleApprove: () => void
  handleTransfer: () => void
}) => {
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
        <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
          <FormControlLabel
            control={<Checkbox checked={approvalComplete} disabled />}
            label="Approval Complete"
          />
          <FormControlLabel
            control={<Checkbox checked={readyForTransfer} disabled />}
            label="Ready for Transfer"
          />
        </Box>
        {missingAllowance > 0 && (
          <Typography sx={{ color: "red", marginTop: 2 }}>
            You need {missingAllowance} more tokens for approval.
          </Typography>
        )}
        <Box sx={{ marginTop: 2 }}>
          {!approvalComplete ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleApprove}
              disabled={transactionProgress}
            >
              Approve
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleTransfer}
              disabled={transactionProgress}
            >
              Transfer
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  )
}
