import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromList } from "../features/lists/animeListSlice";
import Card from "../components/UI/Card";

function AnimeList() {
  const animeList = useSelector((state) => state.list);
  const dispatch = useDispatch();

  return (
    <div>
      <h1 className="heading">Anime List</h1>
      <div className="main_list">
        {animeList.map((anime) => (
          // <li key={anime.id}>
          //     {anime.title}
          //     <button onClick={() => dispatch(removeFromList({id: anime.id}))}>X</button>
          // </li>
          <div>
            <Link key={anime.id} to={`/anime/${anime.id}`}>
              <Card img={anime.img} title={anime.title} />
            </Link>
            <button onClick={() => dispatch(removeFromList({ id: anime.id }))}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AnimeList;
