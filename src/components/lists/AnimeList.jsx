import classes from "./AnimeList.module.css";
import Card from "../UI/Card";
import { Link } from "react-router-dom";

const AnimeList = ({ anime, pageTitle }) => {
  return (
    <div className={classes["top-container"]}>
      <h2>{pageTitle}</h2>
      <div className={classes.main}>
        {anime.map((anime) => (
          <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
            <Card title={anime.title} img={anime.images.jpg.image_url} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AnimeList;
