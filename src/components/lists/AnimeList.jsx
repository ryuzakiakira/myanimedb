import classes from "./AnimeList.module.css";
import Card from "../UI/Card";
import { Link, useLocation } from "react-router-dom";

const AnimeList = ({ anime, pageTitle }) => {
  const location = useLocation();
  const isNotHome =
    location.pathname.includes("/anime") ||
    location.pathname.includes("/manga");

  let mappableContent = "";

  if (isNotHome) {
    mappableContent = "entry";
  }

  return (
    <div className={classes["top-container"]}>
      <h2>{pageTitle}</h2>
      <div className={classes.main}>
        {anime.map((entry) => (
          <Link
            to={`/anime/${entry[`${mappableContent}`].mal_id}`}
            key={entry[`${mappableContent}`].mal_id}
          >
            <Card
              title={entry[`${mappableContent}`].title}
              img={entry[`${mappableContent}`].images.jpg.image_url}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AnimeList;
