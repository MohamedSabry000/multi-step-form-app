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
      state.first_name = "";
      state.last_name = "";
      state.email = "";
      state.age = "";
      state.gender = "";
      state.phone_number = "";
    },
    setFirst(state, {payload}) {
      state.first_name = payload.first_name;
      state.last_name = payload.last_name;
      state.email = payload.email;
    },
    setSecond(state, {payload}) {
      state.age = payload.age || state.age;
      state.gender = payload.gender || state.gender;
      state.phone_number = payload.phone_number || state.phone_number;
    },
    setSuccess(state, {payload}) {
      state.success = payload;
      console.log(state.success);
    }
  },
});

export const { reset, setFirst, setSecond, setSuccess } = formSlice.actions;
export default formSlice.reducer;