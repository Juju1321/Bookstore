import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "src/utils/@globalTypes";
import { RootState } from "src/redux/store";

type InitialType = {
  name?: string | null;
  email: string | null;
  token: string | null;
  id: string | null;
};

const initialState: InitialType = {
  name: null,
  email: null,
  token: null,
  id: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserInfo>) => {
      const { name, email, token, id } = action.payload;
      state.name = name;
      state.email = email;
      state.token = token;
      state.id = id;
    },
    removeUser: (state) => {
      state.name = null;
      state.email = null;
      state.token = null;
      state.id = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;

export const UserSelector = {
  getUser: (state: RootState) => state.user,
};
