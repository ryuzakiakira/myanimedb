import { useLocation } from "react-router-dom";

import Card from "./Card";
import classes from "./SummaryPage.module.css";

function SummaryPage({ data }) {
  const location = useLocation();

  const isMangaRoute = location.pathname.includes("/manga");

  let content;

  if (isMangaRoute) {
    content = (
      <>
        <div className={classes.details} key={data.authors[0].mal_id}>
          <a href={data.authors[0].url}>{data.authors[0].name}</a>
        </div>
        <div className={classes.details}>{data.type}</div>
        <div className={classes.details}>Score: {data.score}</div>
        <div className={classes.details}>
          <a href={data.serializations[0].url}>{data.serializations[0].name}</a>
        </div>
        <div className={classes.details}>{data.status}</div>
      </>
    );
  }

  if (!isMangaRoute) {
    content = (
      <>
        <div className={classes.details} key={data.studios[0].mal_id}>
          <a href={data.studios[0].url}>{data.studios[0].name}</a>
        </div>
        <div className={classes.details}>Source: {data.source}</div>
        <div className={classes.details}>Score: {data.score}</div>
        <div className={classes.details}>Episodes: {data.episodes}</div>
        <div className={classes.details}>{data.status}</div>
      </>
    );
  }

  return (
    <main className={classes["top-container"]}>
      <div className={classes.card}>
        <Card title={data.title} img={data.images.jpg.image_url} />
      </div>
      {content}
      <div className={classes.synopsis}>
        <h2>Synopsis</h2>
        <p>{data.synopsis}</p>
      </div>
      <div>
        <ul className={classes.genres}>
          {data.genres.map((genre) => (
            <li className={classes.genre} key={genre.mal_id}>
              <a href={genre.url}>{genre.name}</a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul className={classes.sites}>
          {data.external.map((sites) => (
            <li className={classes.site}>
              <a href={sites.url}>{sites.name}</a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default SummaryPage;
