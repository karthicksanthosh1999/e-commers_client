import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth_slices";
import adminProductReducer from "./slices/admin/index";
import shopProductReducer from "./slices/shop/index";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductReducer,
    shopProducts: shopProductReducer,
  },
});

export default store;
