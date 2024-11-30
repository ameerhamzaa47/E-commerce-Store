
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ProductState } from "../Type/Reducer Interface";

// Initial state
const initialState: ProductState = {
  products: [],
  filteredProducts: [],
  carts: [],
  loading: false,
  error: null,
};

// Fetch all products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    return data.products;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addtocart: (state, action) => {
      const existingProduct = state.carts.find(
        (item) => item.id === action.payload.id
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
        existingProduct.price =
          (existingProduct.price / (existingProduct.quantity - 1)) *
          existingProduct.quantity;
      } else {
        state.carts.push({ ...action.payload, quantity: 1 });
      }
    },
    deletecart: (state, action: PayloadAction<number>) => {
      state.carts = state.carts.filter((item) => item.id !== action.payload);
    },
    filterByCategory: (state, action: PayloadAction<string>) => {
      const category = action.payload;
      if (category === "All") {
        state.filteredProducts = state.products;
      } else {
        state.filteredProducts = state.products.filter(
          (product) => product.category.toLowerCase() === category.toLowerCase()
        );
      }
    },
    filterByName: (state, action: PayloadAction<string>) => {
      const query = action.payload.toLowerCase();
      if (query === "") {
        state.filteredProducts = state.products;
      } else {
        state.filteredProducts = state.products.filter((product) =>
          product.title.toLowerCase().includes(query)
        );
      }
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.filteredProducts = action.payload; // Initialize filteredProducts with all products
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load products";
      });
  },
});

export const { addtocart, deletecart, filterByCategory, filterByName } = productSlice.actions;

export default productSlice.reducer;