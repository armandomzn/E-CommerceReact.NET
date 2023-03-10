import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { Product } from "../../app/models/products";
import { RootState } from "../../app/store/configureStore";

const productsAdapter = createEntityAdapter<Product>();

export const fetchProductsAsync = createAsyncThunk<Product[] | undefined>(
  "catalog/fetchProductsAsync",
  async (_, thunkAPI) => {
    try {
      return await agent.Catalog.list();
    } catch (e) {
      return thunkAPI.rejectWithValue({ error: e });
    }
  }
);

export const fetchProductAsync = createAsyncThunk<
  Product | undefined,
  { id: string }
>("catalog/fetchProductAsync", async ({ id }, thunkAPI) => {
  try {
    return await agent.Catalog.details(id);
  } catch (e) {
    return thunkAPI.rejectWithValue({ error: e });
  }
});

export const catalogSlice = createSlice({
  name: "catalog",
  initialState: productsAdapter.getInitialState({
    productsLoaded: false,
    status: "idle",
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.productsLoaded = true;
      productsAdapter.setAll(state, action.payload as Product[]);
    });
    builder.addCase(fetchProductsAsync.pending, (state) => {
      state.status = "pendingFetchProducts";
    });
    builder.addCase(fetchProductsAsync.rejected, (state) => {
      state.status = "idle";
    });
    builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
      state.status = "idle";
      productsAdapter.upsertOne(state, action.payload as Product);
    });
    builder.addCase(fetchProductAsync.pending, (state) => {
      state.status = "pendingFetchProduct";
    });
    builder.addCase(fetchProductAsync.rejected, (state) => {
      state.status = "idle";
    });
  },
});

export const productSelectors = productsAdapter.getSelectors(
  (state: RootState) => state.catalog
);
