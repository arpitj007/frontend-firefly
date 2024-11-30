import "./Loader.scss";

function Loader() {
  return (
    <svg
      className="mx-auto d-block"
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="loader_156">
        <g className="loader_circle_1" id="loader_156_1">
          <circle id="Ellipse 928" cx="30" cy="30" r="30" fill="transparent" />
          <path
            id="Subtract"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M30 14C17.2975 14 7 24.2975 7 37C7 49.7025 17.2975 60 30 60C13.4315 60 0 46.5685 0 30C0 13.4315 13.4315 0 30 0V14Z"
            fill="#f05a28"
          />
          <circle id="Ellipse 931" cx="30" cy="7" r="7" fill="#f05a28" />
        </g>
        <g className="loader_circle_1" id="loader_156_2">
          <circle
            id="Ellipse 928_2"
            cx="30"
            cy="30"
            r="30"
            transform="rotate(-180 30 30)"
            fill="transparent"
          />
          <path
            id="Subtract_2"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M30 46C42.7025 46 53 35.7025 53 23C53 10.2975 42.7025 0 30 0C46.5685 0 60 13.4315 60 30C60 46.5685 46.5685 60 30 60V46Z"
            fill="#ec008c"
          />
          <circle
            id="Ellipse 931_2"
            cx="30"
            cy="53"
            r="7"
            transform="rotate(-180 30 53)"
            fill="#ec008c"
          />
        </g>
      </g>
    </svg>
  );
}

export default Loader;
