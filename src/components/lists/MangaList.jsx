import { Link, useLocation } from "react-router-dom";
import Card from "../UI/Card";
import classes from "./MangaList.module.css";

const MangaList = ({ manga, pageTitle }) => {
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
        {manga.map((entry) => (
          <Link
            to={`/manga/${entry[`${mappableContent}`].mal_id}`}
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

export default MangaList;
