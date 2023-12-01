import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToList, removeFromList } from "../../features/lists/animeListSlice";
import { addToMangaList, removeFromMangaList } from "../../features/lists/mangaListSlice";
import Card from "./Card";
import classes from "./SummaryPage.module.css";
import ContentList from "../lists/ContentList";

function SummaryPage({ data, id }) {
  const location = useLocation();
  const isMangaRoute = location.pathname.includes("/manga");
  const dispatch = useDispatch();
  const animeList = useSelector(state => state.animeList.list);
  const mangaList = useSelector(state => state.mangaList.list);

  const [recommendation, setRecommendation] = useState([]);
  const [buttonText, setButtonText] = useState("Add to list");
  const [buttonClicked, setButtonClicked] = useState(false);

  const fetchData = async (id, type) => {
    try {
      const temp = await fetch(
        `https://api.jikan.moe/v4/${type}/${id}/recommendations`
      );
      const recommendation = await temp.json();

      if (type === "anime") {
        setRecommendation(recommendation.data);
      } else if (type === "manga") {
        setRecommendation(recommendation.data);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    const type = isMangaRoute ? "manga" : "anime";
    fetchData(id, type);

    const isButtonClicked = animeList.some(anime => anime.id === id) || mangaList.some(manga => manga.id === id);
    setButtonClicked(isButtonClicked);

    if (isButtonClicked) {
      setButtonText("Remove from list");
    } 

  }, [id, isMangaRoute, animeList, mangaList]);

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

  const listHandler = (e) => {
    e.preventDefault();
    const newItem = { id, type: data.type, title: data.title, img: data.images.jpg.image_url };

    if (!buttonClicked) {
      if (isMangaRoute) {
        dispatch(addToMangaList(newItem));
      } else {
        dispatch(addToList(newItem));
      }
      setButtonText("Remove from list");
      setButtonClicked(true);
    }

    if (buttonClicked) {
      if (isMangaRoute) {
        dispatch(removeFromMangaList({id: newItem.id}));
      } else {
        dispatch(removeFromList({id: newItem.id}));
      }
      setButtonText("Add to list");
      setButtonClicked(false);
    }
    
  };

  const renderRecommendation = () => {
    if (!recommendation || recommendation.length === 0) {
      return;
    }

    return (
      <div className={classes.recommendation}>
        {recommendation && (
          <ContentList
            contents={recommendation}
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
      <button onClick={listHandler}>{buttonText}</button>
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
      {renderRecommendation()}
    </main>
  );
}

export default SummaryPage;
