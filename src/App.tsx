import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPokemonList,
  clearCollection,
} from "./redux/pokemonCollectionSlice";
import { RootState, AppDispatch } from "./redux/store";

import "./App.scss";
import Button from "./ui/Button";
import Pokemon from "./components/Pokemon";

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data, status, error } = useSelector(
    (state: RootState) => state.pokemonCollection
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPokemonList());
    }
  }, [status, dispatch]);

  const handleClearOrReset = (): void => {
    if (data.length > 0) {
      dispatch(clearCollection());
    } else {
      dispatch(fetchPokemonList());
    }
  };

  return (
    <div className="pokemon-app">
      <h1>Pokémon Collection</h1>
      <p>
        Please click on any Pokémon below to fetch more details as the PokéAPI
        returns only the names and URLs.
      </p>
      <p>
        We do not want to DDOS their services by excessively calling hundreds of
        APIs, do we?
      </p>
      <br />
      <Button onClick={handleClearOrReset}>
        {data.length ? "Clear Collection" : "Refetch Pokémons"}
      </Button>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" && (
        <div className="pokemon-grid">
          {data.map((pokemon) => (
            <Pokemon name={pokemon.name} url={pokemon.url} key={pokemon.name} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
