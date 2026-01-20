import { createSelector, createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },

    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (!item) return;

      if (quantity <= 0) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        item.quantity = quantity;
      }
    },

    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export const selectCartTotalQuantity = createSelector(
  [selectCartItems],
  (items) => items.reduce((sum, item) => sum + item.quantity, 0),
);

export const selectCartTotalPrice = createSelector([selectCartItems], (items) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0),
);

export default cartSlice.reducer;
