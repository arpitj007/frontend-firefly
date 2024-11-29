import classNames from "classnames";
import "./Pokemon.scss";

interface PokemonProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  className?: string;
}

function Pokemon({ name, className, ...restProps }: PokemonProps) {
  return (
    <div className={classNames("pokemon", className)} {...restProps}>
      {name}
    </div>
  );
}

export default Pokemon;
