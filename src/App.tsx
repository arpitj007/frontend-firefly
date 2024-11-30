import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useInView } from "react-intersection-observer";

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
import Search from "./components/Search";

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const { data, status, error, hasMore } = useSelector(
    (state: RootState) => state.pokemonCollection
  );
  const { data: currentlySelectedData } = useSelector(
    (state: RootState) => state.currentlySelected
  );

  const modal = useModal();
  // Track when the end of the list is in view
  const { ref: endRef, inView: isEndInView } = useInView({
    threshold: 1.0,
  });
  // Local state to debounce lazy loading
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (!isFetching && isEndInView && hasMore) {
      setIsFetching(true);
      dispatch(fetchPokemonList()).finally(() => setIsFetching(false));
    }
  }, [isEndInView, hasMore, isFetching, dispatch]);

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
      <div className="controls">
        <Button onClick={handleClearOrReset}>
          {data.length ? "Clear Collection" : "Refetch Pokémons"}
        </Button>
        <Search />
      </div>

      {status === "failed" && <p>Error: {error}</p>}
      <div className="pokemon-grid">
        {/* Always render existing data */}
        {data.map((pokemon) => (
          <Pokemon
            onClick={() => handleExpand(pokemon)}
            name={pokemon.name}
            key={pokemon.name}
          />
        ))}
        {/* Trigger lazy loading */}
        {hasMore && (
          <div ref={endRef} className="loading-trigger">
            {isFetching ? <p>Loading more Pokémon...</p> : null}
          </div>
        )}
        {!hasMore && (
          <p className="end-message">You've reached the end of the list!</p>
        )}
      </div>
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
  );
};

export default App;
