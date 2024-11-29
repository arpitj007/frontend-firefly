import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Card.scss";
import { AppDispatch, RootState } from "../redux/store";
import { fetchPokemonDetails } from "../redux/pokemonDetailsSlice";
import Button from "../ui/Button";
import { add } from "../redux/currentlySelectedSlice";
import Loader from "../ui/Loader";

interface CardProps {
  url: string;
  name: string;
}

function Card({ name }: CardProps) {
  const dispatch: AppDispatch = useDispatch();
  const {
    data: details,
    status,
    error,
  } = useSelector((state: RootState) => state.pokemonDetails);

  useEffect(() => {
    if (status === "idle" || details?.name !== name) {
      dispatch(fetchPokemonDetails(name));
    }
  }, [status, dispatch, name, details?.name]);

  if (status === "loading") {
    return (
      <div className="card-container">
        <Loader />
      </div>
    );
  }

  if (!details) return null;

  const abilities = details.abilities
    .map((ability) => ability.ability.name)
    .join(", ");
  const flavorText = details.flavor_text_entries?.find(
    (entry) => entry.language.name === "en"
  )?.flavor_text;

  if (error)
    return (
      <p>
        Error loading data for {name}: {error}
      </p>
    );

  const handleEvolutionClick = () => {
    if (details.evolution) {
      dispatch(add({ name: details.evolution }));
    }
  };

  return (
    <div className="card-container">
      <div className="card">
        <p>
          <strong>Abilities:</strong> {abilities}
        </p>
        {flavorText && (
          <p>
            <strong>Description:</strong> {flavorText}
          </p>
        )}
        <div className="image-container">
          <img src={details.sprites.front_default} alt={`${name}`} />
          <img src={details.sprites.front_shiny} alt={`${name}`} />
          <img src={details.sprites.back_default} alt={`${name}`} />
          <img src={details.sprites.back_shiny} alt={`${name}`} />
        </div>
      </div>
      {details.evolution && (
        <Button onClick={handleEvolutionClick}>
          Go to Evolution: {details.evolution}
        </Button>
      )}
    </div>
  );
}

export default Card;
