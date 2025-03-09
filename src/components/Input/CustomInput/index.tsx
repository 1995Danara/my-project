import { TextField, FormControl } from "@mui/material"

import { CustomInputProps } from "./interface"
import { COLORS } from "src/theme/muitheme"

export const CustomInput = ({
  value,
  onChange,
  placeholder,
  type,
  fullWidth,
}: CustomInputProps) => {
  return (
    <FormControl fullWidth={fullWidth}>
      <TextField
        placeholder={placeholder}
        type={type}
        variant="outlined"
        value={value}
        onChange={onChange}
        fullWidth
        sx={{
          "& .MuiInputBase-root": {
            borderRadius: "30px",
            backgroundColor: COLORS.lightPurple,
          },
        }}
      />
    </FormControl>
  )
}
