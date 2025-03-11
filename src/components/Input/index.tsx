import { TextField, FormControl } from "@mui/material"

import { InputProps } from "./interface"

export const Input = ({
  value,
  onChange,
  placeholder,
  type,
  fullWidth,
}: InputProps) => {
  return (
    <FormControl fullWidth={fullWidth}>
      <TextField
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        fullWidth
      />
    </FormControl>
  )
}
