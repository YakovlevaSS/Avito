import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./slices/userSlice";
import { localStorageMiddleware } from "./slices/userSlice";
import { productsApi } from "./RTKQuery/adsApi";

export const store = configureStore({
    reducer: {
        user: authReducer,
        [productsApi.reducerPath]: productsApi.reducer,
    },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware, productsApi.middleware),

})