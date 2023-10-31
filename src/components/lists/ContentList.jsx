import classes from "./ContentList.module.css";
import Card from "../UI/Card";
import { Link, useLocation } from "react-router-dom";

const ContentList = ({ contents, pageTitle }) => {
  const location = useLocation();
  const isMangaRoute = location.pathname.includes('/manga');
  let route = 'anime';
  if (isMangaRoute) {
    route = 'manga'
  }

  return (
    <div className={classes["top-container"]}>
      <h2>{pageTitle}</h2>
      <div className={classes.main}>
        {contents.map((content) => (
          <Link
            to={`/${route}/${content.entry.mal_id}`}
            key={content.entry.mal_id}
          >
            <Card
              title={content.entry.title}
              img={content.entry.images.jpg.image_url}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ContentList;
