import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { Basket } from "../../app/models/basket";

interface BasketState {
  basket: Basket | null;
  status: string;
}

const initialState: BasketState = {
  basket: null,
  status: "idle",
};

export const addBasketItemAsync = createAsyncThunk<
  Basket,
  { productId: string; quantity: number }
>("basket/addBasketItemAsync", async ({ productId, quantity }) => {
  try {
    return await agent.Basket.addItem(productId, quantity);
  } catch (e) {
    console.log(e);
  }
});

export const removeBasketItemAsync = createAsyncThunk<
  void,
  { productId: string; quantity: number; name?: string }
>("basket/removeBasketItemAsync", async ({ productId, quantity = 1 }) => {
  try {
    return await agent.Basket.deleteItem(productId, quantity);
  } catch (e) {
    console.log(e);
  }
});

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setBasket: (state, action) => {
      state.basket = action.payload;
    },
    removeItem: (state, action) => {
      const { productId, quantity } = action.payload;
      const itemIndex = state.basket?.items.findIndex((item) => {
        return item.productId === productId;
      });
      if (itemIndex === undefined || itemIndex === -1) {
        return;
      }
      state.basket!.items[itemIndex].quantity -= quantity;
      if (state.basket!.items[itemIndex].quantity <= 0) {
        state.basket?.items.splice(itemIndex, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addBasketItemAsync.fulfilled, (state, action) => {
      state.basket = action.payload;
      state.status = "idle";
    });
    builder.addCase(addBasketItemAsync.pending, (state, action) => {
      state.status = `pendingAddItem/${action.meta.arg.productId}`;
    });
    builder.addCase(addBasketItemAsync.rejected, (state) => {
      state.status = "idle";
    });
    builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
      const { productId, quantity } = action.meta.arg;
      const itemIndex = state.basket?.items.findIndex((item) => {
        return item.productId === productId;
      });
      if (itemIndex === undefined || itemIndex === -1) {
        return;
      }
      state.basket!.items[itemIndex].quantity -= quantity;
      if (state.basket!.items[itemIndex].quantity <= 0) {
        state.basket?.items.splice(itemIndex, 1);
      }
      state.status = "idle";
    });
    builder.addCase(removeBasketItemAsync.pending, (state, action) => {
      state.status = `pendingRemoveItem/${action.meta.arg.productId}/${action.meta.arg.name}`;
    });
  },
});

export const { setBasket, removeItem } = basketSlice.actions;
