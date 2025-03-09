import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface TokenTransferState {
  amount: string
  recipientAddress: string
  approveStatus: boolean
  formattedAmount: string | null
}

const initialState: TokenTransferState = {
  amount: "",
  recipientAddress: "",
  formattedAmount: null,
  approveStatus: false,
}

const TokenTransferSlice = createSlice({
  name: "tokenTransfer",
  initialState,
  reducers: {
    setAmount(state, action: PayloadAction<string>) {
      state.amount = action.payload
    },
    setRecipientAddress(state, action: PayloadAction<string>) {
      state.recipientAddress = action.payload
    },
    setFormattedAmount(state, action: PayloadAction<string>) {
      state.formattedAmount = action.payload
    },
    setApproveStatus(state, action: PayloadAction<boolean>) {
      state.approveStatus = action.payload
    },
  },
})
export const {
  setAmount,
  setRecipientAddress,
  setFormattedAmount,
  setApproveStatus,
} = TokenTransferSlice.actions

export default TokenTransferSlice.reducer
