import { Link } from "react-router-dom";
import Card from "../UI/Card";
import classes from "./MangaList.module.css";

const MangaList = ({ manga, pageTitle }) => {
  return (
    <div className={classes["top-container"]}>
      <h2>{pageTitle}</h2>
      <div className={classes.main}>
        {manga.map((manga) => (
          <Link to={`/manga/${manga.mal_id}`} key={manga.mal_id}>
            <Card title={manga.title} img={manga.images.jpg.image_url} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MangaList;
