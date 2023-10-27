import classes from './List.module.css';
import Card from '../UI/Card';

const List = ({ list }) => {
    return (
      <div className={classes['top-container']}>
        <div className={classes.main}>
          {list.map((content) => (
            <Card
              key={content.mal_id}
              title={content.title}
              img={content.images.jpg.image_url}
            />
          ))}
        </div>
      </div>
    );
  };

  export default List;
  