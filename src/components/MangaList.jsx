import Card from "./Card";
import classes from './MangaList.module.css';

const MangaList = ({ manga, pageTitle }) => {
    return (
      <div className={classes['top-container']}>
        <h2>{pageTitle}</h2>
        <div className={classes.main}>
          {manga.map((manga) => (
            <Card
              key={manga.mal_id}
              title={manga.title}
              img={manga.images.jpg.image_url}
            />
          ))}
        </div>
      </div>
    );
  };
  
  export default MangaList;