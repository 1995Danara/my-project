export interface ModalDialogProps {
  open: boolean
  address: string | undefined
  onClose: () => void
  onDisconnect: () => void
  wrongNetwork: boolean
  onSwitchNetwork: () => void
}
