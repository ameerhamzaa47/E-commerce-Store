import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../Reducer/reducer';

const Store = configureStore({
  reducer: {
    products: productReducer,
  },
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

export default Store;
