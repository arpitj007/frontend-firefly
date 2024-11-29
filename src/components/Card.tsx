import "./Card.scss";

interface CardProps {
  url: string;
  name: string;
}

function Card({ url, name }: CardProps) {
  console.log(url, name);
  return (
    <div className="card">
      <img alt="Pokemon card" />
    </div>
  );
}

export default Card;
