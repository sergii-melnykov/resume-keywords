import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TextState {
  text: string;
}

const initialState: TextState = {
  text: '',
};

export const textSlice = createSlice({
  name: 'text',
  initialState,
  reducers: {
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
    clearText: (state) => {
      state.text = '';
    },
  },
});

export const { setText, clearText } = textSlice.actions;
export default textSlice.reducer;
