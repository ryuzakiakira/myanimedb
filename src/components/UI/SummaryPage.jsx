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

  console.log(id);

  const fetchData = async (id, type) => {
    try {
      const temp = await fetch(
        `https://api.jikan.moe/v4/${type}/${id}/recommendations`
      );
      const recommendation = await temp.json();

      if (type === "anime") {
        setAnimeRecommendation(recommendation.data);
      } else if (type === "manga") {
        setMangaRecommendation(recommendation.data);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    const type = isMangaRoute ? "manga" : "anime";
    fetchData(id, type);
  }, [id, isMangaRoute]);

  const renderDetails = () => {
    const details = data.studios?.[0] ||
      data.authors?.[0] || { name: "UNKNOWN", url: "#" };

    return (
      <div className={classes.details} key={details?.mal_id}>
        <a href={details?.url}>{details?.name}</a>
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className={classes["details-container"]}>
        {isMangaRoute ? (
          renderDetails()
        ) : (
          <div className={classes.details}>Source: {data.source}</div>
        )}
        <div className={classes.details}>Score: {data.score}</div>
        {isMangaRoute ? null : (
          <div className={classes.details}>Episodes: {data.episodes}</div>
        )}
        <div className={classes.details}>{data.status}</div>
      </div>
    );
  };

  const renderRecommendation = () => {
    const recommendationData = isMangaRoute
      ? mangaRecommendation
      : animeRecommendation;

    if (recommendationData.length === 0) {
      return;
    }

    return (
      <div className={classes.recommendation}>
        {recommendationData && (
          <ContentList
            contents={recommendationData}
            pageTitle={"Recommendations"}
          />
        )}
      </div>
    );
  };

  return (
    <main className={classes["top-container"]}>
      <div className={classes.card}>
        <Card title={data.title} img={data.images.jpg.image_url} />
      </div>
      {renderContent()}
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
          {console.log(data.relations)}
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
      {renderRecommendation()}
    </main>
  );
}

export default SummaryPage;
