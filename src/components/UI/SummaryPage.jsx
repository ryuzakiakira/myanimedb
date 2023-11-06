import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Card from "./Card";
import classes from "./SummaryPage.module.css";
import ContentList from "../lists/ContentList";

function SummaryPage({ data, id }) {
  const location = useLocation();
  const isMangaRoute = location.pathname.includes("/manga");

  const [animeRecommendation, setAnimeRecommendation] = useState([]);
  const [mangaRecommendation, setMangaRecommendation] = useState([]);

  const getAnimeRecommendation = async (id) => {
    try {
      const temp = await fetch(
        `https://api.jikan.moe/v4/anime/${id}/recommendations`
      );
      const animeRecommendation = await temp.json();
      setAnimeRecommendation(animeRecommendation.data);
    } catch (err) {
      console.error("Something went wrong", err);
    }
  };

  const getMangaRecommendation = async (id) => {
    try {
      const temp = await fetch(
        `https://api.jikan.moe/v4/manga/${id}/recommendations`
      );
      const mangaRecommendation = await temp.json();
      setMangaRecommendation(mangaRecommendation.data);
    } catch (err) {
      console.error("Something went wrong", err);
    }
  };

  useEffect(() => {
    if (isMangaRoute) {
      getMangaRecommendation(id);
    }

    if (!isMangaRoute) {
      getAnimeRecommendation(id);
    }
  }, [id]);

  let content;

  if (isMangaRoute) {
    content = (
      <div className={classes["details-container"]}>
        {data.authors[0] && (
          <div className={classes.details} key={data.authors[0].mal_id}>
            <a href={data.authors[0].url}>{data.authors[0].name}</a>
          </div>
        )}
        {!data.authors[0] && (
          <div className={classes.details} key={"1"}>
            <a href="#">UNKNOWN</a>
          </div>
        )}
        <div className={classes.details}>{data.type}</div>
        <div className={classes.details}>Score: {data.score}</div>
        <div className={classes.details}>
          {data.serializations && (
            <a href={data.serializations[0] ? data.serializations[0].url : "#"}>
              {data.serializations[0] ? data.serializations[0].name : "UNKNOWN"}
            </a>
          )}
        </div>
        <div className={classes.details}>{data.status}</div>
      </div>
    );
  }

  if (!isMangaRoute) {
    content = (
      <div className={classes["details-container"]}>
        {data.studios[0] && (
          <div className={classes.details} key={data.studios[0].mal_id}>
            <a href={data.studios[0].url}>{data.studios[0].name}</a>
          </div>
        )}
        {!data.studios[0] && (
          <div className={classes.details} key={"1"}>
            <a href="#">UNKNOWN</a>
          </div>
        )}
        <div className={classes.details}>Source: {data.source}</div>
        <div className={classes.details}>Score: {data.score}</div>
        <div className={classes.details}>Episodes: {data.episodes}</div>
        <div className={classes.details}>{data.status}</div>
      </div>
    );
  }

  return (
    <main className={classes["top-container"]}>
      <div className={classes.card}>
        <Card title={data.title} img={data.images.jpg.image_url} />
      </div>
      {content}
      <div className={classes["synopsis-top-container"]}>
        <div className={classes.synopsis}>
          <h2>Synopsis</h2>
          <p>{data.synopsis}</p>
        </div>
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
      <div className={classes["top-relations-container"]}>
        <div className={classes.relations}>
          {data.relations.map((relation) => (
            <div
              className={classes["relation_container"]}
              key={Math.floor(Math.random() * 100 + 1)}
            >
              <h2>{relation.relation}</h2>
              {relation.entry.map((entry) => (
                <p key={entry.mal_id + Math.floor(Math.random() * 100 + 1)}>
                  <Link
                    to={
                      entry.type === "manga"
                        ? `/manga/${entry.mal_id}`
                        : entry.type === "Light Novel"
                        ? `manga/${entry.mal_id}`
                        : `/anime/${entry.mal_id}`
                    }
                  >
                    {entry.name}({entry.type})
                  </Link>
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div>
        <ul className={classes.sites}>
          {data.external.map((sites) => (
            <li
              className={classes.site}
              key={sites.name + Math.floor(Math.random() * 100 + 1)}
            >
              <a href={sites.url}>{sites.name}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className={classes.recommendation}>
        {isMangaRoute && mangaRecommendation && (
          <ContentList
            contents={mangaRecommendation}
            pageTitle={"Recommendations"}
          />
        )}
        {!isMangaRoute && animeRecommendation && (
          <ContentList
            contents={animeRecommendation}
            pageTitle={"Recommendations"}
          />
        )}
      </div>
    </main>
  );
}

export default SummaryPage;
