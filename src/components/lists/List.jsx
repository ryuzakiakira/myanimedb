import { Link, useLocation } from "react-router-dom";

import classes from "./List.module.css";
import Card from "../UI/Card";

const List = ({ list }) => {
  const location = useLocation();

  const isMangaRoute = location.pathname.includes("/manga");
  const isAnimeRoute = location.pathname.includes("/anime");

  return (
    <div className={classes["top-container"]}>
      <div className={classes.main}>
        {list.map((content) => (
          <Link
            to={
              isMangaRoute
                ? `/manga/${content.mal_id}`
                : isAnimeRoute
                ? `/anime/${content.mal_id}`
                : "/"
            }
            key={content.mal_id}
          >
            <Card title={content.title} img={content.images.jpg.image_url} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default List;
