import { configureStore } from "@reduxjs/toolkit";
import pokemonCollectionReducer from "./pokemonCollectionSlice";
import pokemonDetailsReducer from "./pokemonDetailsSlice";
import currentlySelectedReducer from "./currentlySelectedSlice";

export const store = configureStore({
  reducer: {
    pokemonCollection: pokemonCollectionReducer,
    pokemonDetails: pokemonDetailsReducer,
    currentlySelected: currentlySelectedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
