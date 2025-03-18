export interface TokenTransferDialogProps {
  open: boolean
  onClose: () => void
  amount: string
  address: string
  isButtonApprove: boolean
  handleApprove: () => void
  handleTransfer: () => void
  transactionProgress: boolean
  missingAllowance: number
}
