import { TextField } from "@mui/material"

import { InputProps } from "./interface"

export const Input = (props: InputProps) => {
  return <TextField {...props} fullWidth />
}
