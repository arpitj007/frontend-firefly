import "./FavoriteStar.scss";

const favoriteMap = {
  add: "#ECF0F1",
  remove: "#F8C660",
} as const;

interface FavoriteStarProps {
  type: keyof typeof favoriteMap;
  onClick?: () => void; // Add onClick handler to props
}

function FavoriteStar({ type = "add", ...otherProps }: FavoriteStarProps) {
  return (
    <div className="favorite" {...otherProps}>
      <svg
        height="32px"
        width="32px"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <circle style={{ fill: "#ECF0F1" }} cx="256" cy="256" r="245.551" />
        <path
          style={{ fill: favoriteMap[type] }}
          d="M256,345.295l-80.407,42.272c-9.34,4.911-20.257-3.021-18.473-13.422l15.357-89.535l-65.051-63.409
	c-7.557-7.365-3.387-20.199,7.056-21.716l89.898-13.063l40.203-81.461c4.671-9.463,18.163-9.463,22.834,0l40.203,81.461
	l89.898,13.063c10.443,1.517,14.613,14.351,7.056,21.716l-65.051,63.409l15.357,89.535c1.784,10.401-9.132,18.332-18.473,13.422
	L256,345.295z"
        />
        <g>
          <path
            style={{ fill: "#231F20" }}
            d="M437.019,74.981C388.668,26.628,324.38,0,256,0S123.332,26.628,74.981,74.981S0,187.62,0,256
		s26.628,132.668,74.981,181.019S187.62,512,256,512s132.668-26.628,181.019-74.981S512,324.38,512,256
		S485.372,123.332,437.019,74.981z M256,491.102C126.365,491.102,20.898,385.635,20.898,256S126.365,20.898,256,20.898
		S491.102,126.365,491.102,256S385.635,491.102,256,491.102z"
          />
          <path
            style={{ fill: "#231F20" }}
            d="M256,41.796C137.887,41.796,41.796,137.887,41.796,256S137.887,470.204,256,470.204
		c118.112,0,214.204-96.091,214.204-214.204S374.112,41.796,256,41.796z M256,449.306c-106.589,0-193.306-86.717-193.306-193.306
		S149.411,62.694,256,62.694c106.59,0,193.306,86.717,193.306,193.306S362.59,449.306,256,449.306z"
          />
          <path
            style={{ fill: "#231F20" }}
            d="M417.735,204.921c-2.747-8.453-9.917-14.498-18.712-15.776l-84.463-12.273l-37.772-76.536
		c-3.934-7.97-11.899-12.922-20.787-12.921c-8.888,0-16.853,4.952-20.786,12.921l-37.773,76.536l-84.462,12.273
		c-8.796,1.278-15.966,7.323-18.713,15.776c-2.746,8.453-0.498,17.558,5.866,23.763l61.117,59.575l-14.428,84.121
		c-1.503,8.76,2.031,17.448,9.222,22.672c7.19,5.225,16.545,5.901,24.412,1.764L256,357.1l75.545,39.717
		c3.422,1.799,7.124,2.687,10.809,2.687c4.786,0,9.54-1.5,13.604-4.451c7.191-5.224,10.725-13.912,9.222-22.672l-14.428-84.121
		l61.117-59.575C418.234,222.48,420.482,213.374,417.735,204.921z M397.282,213.72l-65.051,63.41
		c-2.462,2.4-3.586,5.859-3.005,9.248l15.356,89.535c0.159,0.928-0.146,1.679-0.908,2.233s-1.568,0.612-2.404,0.174l-80.407-42.273
		c-1.521-0.8-3.192-1.201-4.862-1.201c-1.67,0-3.341,0.4-4.862,1.201l-80.408,42.273c-0.833,0.438-1.64,0.38-2.404-0.174
		c-0.762-0.554-1.067-1.305-0.908-2.233l15.357-89.535c0.582-3.39-0.542-6.848-3.005-9.248l-65.051-63.41
		c-0.675-0.657-0.869-1.445-0.578-2.341c0.29-0.895,0.911-1.418,1.843-1.554l89.898-13.063c3.403-0.494,6.346-2.632,7.867-5.716
		l40.205-81.462c0.417-0.844,1.105-1.272,2.047-1.272c0.941,0,1.631,0.428,2.047,1.273l40.203,81.461
		c1.522,3.083,4.464,5.221,7.867,5.716l89.9,13.063c0.932,0.136,1.551,0.658,1.842,1.554
		C398.151,212.275,397.956,213.063,397.282,213.72z"
          />
        </g>
      </svg>
      <p>{type === "add" ? "Add" : "Remove"} Favorite</p>
    </div>
  );
}

export default FavoriteStar;
