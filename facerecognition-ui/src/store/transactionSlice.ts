
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartItem = {
  id: number;
  image: string;
  date: string;
  price: number;
  selected: boolean;
};

type TransactionState = {
  items: CartItem[];
  paymentMethod: string;
  total: number;
};

const initialState: TransactionState = {
  items: [],
  paymentMethod: "",
  total: 0,
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setTransactionData: (
      state,
      action: PayloadAction<{
        items: CartItem[];
        paymentMethod: string;
        total: number;
      }>
    ) => {
      state.items = action.payload.items;
      state.paymentMethod = action.payload.paymentMethod;
      state.total = action.payload.total;
    },
    clearTransactionData: (state) => {
      state.items = [];
      state.paymentMethod = "";
      state.total = 0;
    },
  },
});

export const { setTransactionData, clearTransactionData } = transactionSlice.actions;
export default transactionSlice.reducer;
