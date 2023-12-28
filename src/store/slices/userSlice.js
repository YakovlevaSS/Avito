import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  name: null,
  id: null,
  surname: null,
  avatar: null,
  phone: null,
  role: null,

  accessToken: null,
  refreshToken: null,
  typeToken: null,
};

const localStorageMiddleware = (store) => (next) => (action) => {
  if (action.type === userSlice.actions.initializeUserFromLocalStorage.type) {
    const storedEmail = localStorage.getItem("email");
    const storedName = localStorage.getItem("nameUser");
    const storedId = localStorage.getItem("id");
    const stored = localStorage.getItem("id");
    const storedId = localStorage.getItem("id");
    const storedId = localStorage.getItem("id");
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");
    const storedTypeToken = localStorage.getItem("typeToken");

    if (storedEmail && storedNameUser && storedId && storedAccessToken && storedRefreshToken && storedTypeToken) {
      store.dispatch(
        userSlice.actions.setUser({
          email: storedEmail,
          name: storedNameUser,
          id: storedId,
          accessToken: storedAccessToken,
          refreshToken: storedRefreshToken,
        })
      );
    }
  }

  return next(action);
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.password = action.payload.password;
      localStorage.setItem("email", state.email);
      localStorage.setItem("token", state.token);
      localStorage.setItem("id", state.id);
      localStorage.setItem("password", state.password);
      localStorage.setItem("progress", state.progress);
    },
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
      state.password = null;
      localStorage.removeItem("email");
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      localStorage.removeItem("password");
      localStorage.removeItem("progress");
    },

    initializeUserFromLocalStorage() {
      // Пустное действие, middleware будет обрабатывать это действие
    }
  }
});

export const {
  setUser,
  removeUser,
  initializeUserFromLocalStorage,
} = userSlice.actions;
export default userSlice.reducer;
export const userReducer = userSlice.reducer;
export { localStorageMiddleware };
