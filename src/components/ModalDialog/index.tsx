import { Button, Modal, Box } from "@mui/material"

import { ModalDialogProps } from "./interface"

export const ModalDialog = ({
  open,
  address,
  onClose,
  onDisconnect,
  wrongNetwork,
  onSwitchNetwork,
}: ModalDialogProps) => {
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
        {wrongNetwork ? (
          <>
            <p>Wrong network</p>
            <Button variant="contained" onClick={onSwitchNetwork}>
              Switch Network
            </Button>
          </>
        ) : (
          address && (
            <>
              <p>{address}</p>
              <Button variant="contained" onClick={onDisconnect}>
                Disconnect
              </Button>
            </>
          )
        )}
      </Box>
    </Modal>
  )
}
