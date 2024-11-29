import "./Pokemon.scss";

interface PokemonProps {
  name: string;
  url: string;
}

function Pokemon({ name, url }: PokemonProps) {
  return <div className="pokemon">{name}</div>;
}

export default Pokemon;
