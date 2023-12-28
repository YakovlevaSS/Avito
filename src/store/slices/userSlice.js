import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  name: null,
  id: null,
  surname: null,
  avatar: null,
  phone: null,
  role: null,
  city:null,

  accessToken: null,
  refreshToken: null,
  typeToken: null,
};

const localStorageMiddleware = (store) => (next) => (action) => {
  if (action.type === userSlice.actions.initializeUserFromLocalStorage.type) {
    const storedEmail = localStorage.getItem("email");
    const storedName = localStorage.getItem("nameUser");
    const storedId = localStorage.getItem("id");
    const storedSurname = localStorage.getItem("surname");
    const storedAvatar = localStorage.getItem("avatar");
    const storedPhone = localStorage.getItem("phone");
    const storedRole = localStorage.getItem("role");
    const storedCity = localStorage.getItem("city");
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");
    const storedTypeToken = localStorage.getItem("typeToken");

    if (storedEmail) {
      store.dispatch(
        userSlice.actions.setUser({
          email: storedEmail,
          name: storedName,
          id: storedId,
          surname: storedSurname,
          avatar: storedAvatar,
          phone: storedPhone,
          role: storedRole,
          city: storedCity
        })
      );
    }

    if (storedAccessToken && storedRefreshToken && storedTypeToken) {
      store.dispatch(
        userSlice.actions.setToken({
          accessToken: storedAccessToken,
          refreshToken: storedRefreshToken,
          typeToken: storedTypeToken,
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
      state.name = action.payload.name;
      state.id = action.payload.id;
      state.surname = action.payload.surname;
      state.avatar = action.payload.avatar;
      state.phone = action.payload.phone;
      state.role = action.payload.role;
      state.city = action.payload.city;
      localStorage.setItem("email", state.email);
      localStorage.setItem("token", state.token);
      localStorage.setItem("id", state.id);
      localStorage.setItem("surname", state.surname);
      localStorage.setItem("avatar", state.avatar);
      localStorage.setItem("phone", state.phone);
      localStorage.setItem("role", state.role);
      localStorage.setItem("city", state.city);
    },
    setToken(state, action) {
      state.accessToken= action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.typeToken= action.payload.typeToken;
      localStorage.setItem("accessToken", state.accessToken);
      localStorage.setItem("refreshToken", state.refreshToken);
      localStorage.setItem("typeToken", state.typeToken);
    },
    removeUser(state) {
      state.email = '';
      state.name = '';
      state.id = '';
      state.surname = '';
      state.avatar = '';
      state.phone = '';
      state.role = '';
      state.city = '';
      state.accessToken = '';
      state.refreshToken = '';
      state.typeToken =  '';
      localStorage.removeItem("email");
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      localStorage.removeItem("surname");
      localStorage.removeItem("avatar");
      localStorage.removeItem("phone");
      localStorage.removeItem("role");
      localStorage.removeItem("city");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("typeToken");
    },

    initializeUserFromLocalStorage() {
      // Пустное действие, middleware будет обрабатывать это действие
    }
  }
});

export const {
  setUser,
  setToken,
  removeUser,
  initializeUserFromLocalStorage,
} = userSlice.actions;
export default userSlice.reducer;
export const userReducer = userSlice.reducer;
export { localStorageMiddleware };
