import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  error: null,
};

const consumptionSlice = createSlice({
  name: "consumtion",
  initialState,
  reducers: {
    storeConsumption: (state, action) => {
      state.items = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { storeConsumption, setError } = consumptionSlice.actions;

export default consumptionSlice.reducer;
