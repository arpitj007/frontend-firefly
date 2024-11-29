import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPokemonList,
  clearCollection,
  PokemonBase,
} from "./redux/pokemonCollectionSlice";
import { RootState, AppDispatch } from "./redux/store";
import { add, clearSelected } from "./redux/currentlySelectedSlice";

import "./App.scss";
import Button from "./ui/Button";
import Pokemon from "./components/Pokemon";
import Modal, { useModal } from "./ui/Modal";
import Card from "./components/Card";

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data, status, error } = useSelector(
    (state: RootState) => state.pokemonCollection
  );
  const { data: currentlySelectedData } = useSelector(
    (state: RootState) => state.currentlySelected
  );
  const modal = useModal();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPokemonList());
    }
  }, [status, dispatch]);

  const handleClearOrReset = useCallback((): void => {
    if (data.length > 0) {
      dispatch(clearCollection());
    } else {
      dispatch(fetchPokemonList());
    }
  }, [data.length, dispatch]);

  const handleExpand = useCallback(
    (pokemon: PokemonBase) => {
      dispatch(add(pokemon));
      modal.show();
    },
    [modal, dispatch]
  );

  return (
    <>
      <div className="pokemon-app">
        <h1>Pokémon Collection</h1>
        <p>
          Please click on any Pokémon below to fetch more details as the PokéAPI
          returns only the names and URLs.
        </p>
        <p>
          We do not want to DDOS their services by excessively calling hundreds
          of APIs, do we?
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
              <Pokemon
                onClick={() => handleExpand(pokemon)}
                name={pokemon.name}
                key={pokemon.name}
              />
            ))}
          </div>
        )}
        <Modal
          dialog={modal}
          title={currentlySelectedData?.name}
          showCloseIcon={true}
          shouldHideOnOverlayClick={true}
          modalCloseAction={() => dispatch(clearSelected())}
        >
          {currentlySelectedData && (
            <Card
              name={currentlySelectedData.name}
              url={currentlySelectedData.url}
            />
          )}
        </Modal>
      </div>
    </>
  );
};

export default App;
