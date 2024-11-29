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
}

const initialState: PokemonCollectionState = {
  data: [],
  status: "idle",
  error: null,
};

// Async thunk to fetch Pokémon data from the PokeAPI
export const fetchPokemonList = createAsyncThunk(
  "pokemonCollection/fetchPokemon",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_API}/pokemon?limit=100`);
      console.log(response.data, "response.data");
      return response.data.results; // Only return Pokémon results
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
        (state, action: PayloadAction<PokemonBase[]>) => {
          state.status = "succeeded";
          state.data = action.payload;
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
