import classes from "./AnimeList.module.css";
import Card from "./Card";

const AnimeList = ({ topAnime }) => {
  return (
    <div className={classes['top-container']}>
      <h2>Top Anime</h2>
      <div className={classes.main}>
        {topAnime.map((anime) => (
          <Card
            key={anime.mal_id}
            title={anime.title}
            img={anime.images.jpg.image_url}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimeList;
