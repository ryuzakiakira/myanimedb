import { Link, } from "react-router-dom";

import classes from "./List.module.css";
import Card from "../UI/Card";

const List = ({ list }) => {

  return (
    <div className={classes["top-container"]}>
      <div className={classes.main}>
        {list.map((content) => (
          <Link
            to={
              content.type === "Manga" ? `/manga/${content.mal_id}` : content.type === "Light Novel" ? `manga/${content.mal_id}` : `/anime/${content.mal_id}`
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
