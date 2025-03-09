export interface CustomInputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  type?: string
  fullWidth?: boolean
  formattedBalance?: string | null
}
