import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiStatus, BASE_API } from "./api";

interface Ability {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

interface Stat {
  base_stat: number;
  effort: number;
  stat: {
    name:
      | "hp"
      | "attack"
      | "defense"
      | "special-attack"
      | "special-defense"
      | "speed";
    url: string;
  };
}

interface Sprite {
  front_default: string;
  back_shiny: string;
  back_default: string;
  front_shiny: string;
}

interface FlavorText {
  flavor_text: string;
  language: {
    name: string;
  };
}

interface PokemonDetails {
  abilities: Ability[];
  baseExperience: number;
  height: number;
  id: number;
  is_default: boolean;
  sprites: Sprite;
  name: string;
  order: number;
  stats: Stat[];
  flavor_text_entries: FlavorText[];
  evolution: null | string; // Could be either null or the name of the next evolution.
  evolutionUrl?: string;
  species: {
    name: string;
    url: string;
  };
}

interface PokemonDetailsState {
  data: PokemonDetails;
  status: ApiStatus;
  error: string | null;
}

const initialState: PokemonDetailsState = {
  data: null,
  status: "idle",
  error: null,
};

export const fetchPokemonDetails = createAsyncThunk(
  "pokemonDetails/fetchPokemonDetails",
  async (pokemonName: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_API}/pokemon/${pokemonName}`);
      const details: PokemonDetails = response.data;

      // Fetch species information for evolution chain
      const speciesResponse = await axios.get(details.species.url);
      const evolutionChainUrl = speciesResponse.data.evolution_chain.url;

      const evolutionChainResponse = await axios.get(evolutionChainUrl);
      const evolutionChain = evolutionChainResponse.data.chain;

      let evolutionUrl: string | null = null;

      // Traverse the evolution chain
      let current = evolutionChain;
      while (current) {
        if (current.species.name === details.name) {
          if (current.evolves_to.length > 0) {
            evolutionUrl = `${BASE_API}/pokemon/${current.evolves_to[0].species.name}`;
          }
          break;
        }
        current = current.evolves_to[0];
      }

      return {
        ...details,
        evolution: evolutionUrl ? current.evolves_to[0].species.name : null,
        evolutionUrl,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch Pokémon details"
      );
    }
  }
);

const pokemonDetailsSlice = createSlice({
  name: "pokemonDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonDetails.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.data = null;
      })
      .addCase(
        fetchPokemonDetails.fulfilled,
        (state, action: PayloadAction<PokemonDetails>) => {
          state.status = "succeeded";
          state.data = action.payload;
        }
      )
      .addCase(
        fetchPokemonDetails.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.error = action.payload;
        }
      );
  },
});

export default pokemonDetailsSlice.reducer;
