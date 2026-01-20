import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setUserLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setUser, setUserLoading } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectUserLoading = (state) => state.user.loading;

export const fetchUser = () => (dispatch) => {
  dispatch(setUserLoading(true));

  setTimeout(() => {
    dispatch(
      setUser({
        id: 1,
        name: 'Иван Иванов',
        email: 'ivan@example.com',
      })
    );
    dispatch(setUserLoading(false));
  }, 500);
};

export default userSlice.reducer;
