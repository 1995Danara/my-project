import { CustomInput } from "../CustomInput"

export const AmountInput = ({
  value,
  onChange,
}: {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) => {
  return (
    <CustomInput
      value={value}
      onChange={onChange}
      placeholder="Please, enter amount"
      type="number"
    />
  )
}
