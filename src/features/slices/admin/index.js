import { BASE_URL } from "@/App";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
  error: null,
};

export const addNewProduct = createAsyncThunk(
  "/product/addNewProduct",
  async (formData) => {
    const result = await axios.post(
      `${BASE_URL}/admin/products/add-product`,
      formData,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return result.data;
  }
);

export const fetchAllProducts = createAsyncThunk(
  "/product/getAllProducts",
  async () => {
    const result = await axios.get(
      `${BASE_URL}/admin/products/get-all-products`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    if (result) {
      return result.data?.data;
    }
  }
);

export const editProduct = createAsyncThunk(
  "/product/update",
  async ({ id, formData }) => {
    const result = await axios.put(
      `${BASE_URL}/admin/products/update-product/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    if (result) {
      console.log(result.data?.data);
      return result.data?.data;
    }
  }
);

export const getSingleProduct = createAsyncThunk(
  "/product/getsingle",
  async (id) => {
    const result = await axios.get(
      `${BASE_URL}/admin/products/get-single-product/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log(result.data?.data);
    if (result) {
      return result.data?.data;
    }
  }
);

export const deleteProduct = createAsyncThunk("/delete/product", async (id) => {
  const result = await axios.delete(
    `${BASE_URL}/admin/products/delete-product`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  console.log(result.data?.data);
  if (result.data) {
    return result.data?.data;
  }
});

const AdminProductsSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.productList = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default AdminProductsSlice.reducer;
