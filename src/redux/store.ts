import { configureStore } from "@reduxjs/toolkit";
import pokemonCollectionReducer from "./pokemonCollectionSlice";

export const store = configureStore({
  reducer: {
    pokemonCollection: pokemonCollectionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
