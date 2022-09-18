import { createSlice } from '@reduxjs/toolkit';

type IForm = {
  first_name: string;
  last_name: string;
  email: string;
  age?: number | string;
  gender?: string;
  phone_number: number | string;
  success: boolean;
};

const initialState: IForm = {
  first_name: "",
  last_name: "",
  email: "",
  age: "",
  gender: "",
  phone_number: "",
  success: false,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    reset(state) {
      state = initialState;
    },
    setForm(state, {payload}) {
      console.log(payload);
      Array.from(Object.keys(payload)).forEach((key) => {
        state = {...state, [key]: payload[key]}
      })
    }
  },
});

export const { reset, setForm } = formSlice.actions;
export default formSlice.reducer;