import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth_slices";
import adminProductReducer from "./slices/admin/index";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductReducer,
  },
});

export default store;
