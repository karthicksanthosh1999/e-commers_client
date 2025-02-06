import { BASE_URL } from "@/App";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
  producDetails: {},
  error: null,
};

export const fetchAllFilteredProducts = createAsyncThunk(
  "shopping/fetchAllFilteredProducts",
  async ({ filterParams, sortParams }) => {
    const query = new URLSearchParams({
      ...filterParams, sortBy: sortParams
    })

    const result = await axios.get(
      `${BASE_URL}/shop/products/filtered-products?${query}`,
      { withCredentials: true }
    );
    return result.data?.data;
  }
);


export const fetchProductDetails = createAsyncThunk('shopping/fetchSingleProduct', async (id) => {
  const result = await axios.get(`${BASE_URL}/shop/products/get-product/${id}`)
  return result.data?.data
})


const shopingSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredProducts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload;
      })
      .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchProductDetails.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.producDetails = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.producDetails = null
      })
  },
});

export default shopingSlice.reducer;
