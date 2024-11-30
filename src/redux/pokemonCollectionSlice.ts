import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiStatus, BASE_API } from "./api";

export interface PokemonBase {
  name: string;
  url: string;
}

interface PokemonCollectionState {
  data: PokemonBase[];
  status: ApiStatus;
  error: string | null;
  hasMore: boolean;
  offset: number;
}

const initialState: PokemonCollectionState = {
  data: [],
  status: "idle",
  error: null,
  hasMore: true,
  offset: 0,
};

// Async thunk to fetch Pokémon data from the PokeAPI
export const fetchPokemonList = createAsyncThunk(
  "pokemonCollection/fetchPokemon",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as {
      pokemonCollection: PokemonCollectionState;
    };
    const { offset } = state.pokemonCollection;
    const limit = 150;
    try {
      const response = await axios.get(
        `${BASE_API}/pokemon?limit=${limit}&offset=${offset}`
      );

      return {
        results: response.data.results,
        count: response.data.count,
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const pokemonCollectionSlice = createSlice({
  name: "pokemonCollection",
  initialState,
  reducers: {
    clearCollection: (state) => {
      state.data = [];
      state.hasMore = true;
      state.offset = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonList.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchPokemonList.fulfilled,
        (
          state,
          action: PayloadAction<{ results: PokemonBase[]; count: number }>
        ) => {
          state.status = "succeeded";
          state.data = [...state.data, ...action.payload.results];
          state.offset += action.payload.results.length;
          console.log(state.data.length, action.payload.count);
          state.hasMore = state.data.length < action.payload.count;
        }
      )
      .addCase(
        fetchPokemonList.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.error = action.payload || "Failed to fetch Pokémon data.";
        }
      );
  },
});

export const { clearCollection } = pokemonCollectionSlice.actions;

export default pokemonCollectionSlice.reducer;
