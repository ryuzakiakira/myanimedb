import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromList } from "../features/lists/animeListSlice";
import Card from "../components/UI/Card";

function AnimeList() {
  const animeList = useSelector((state) => state.animeList.list);
  const dispatch = useDispatch();

  return (
    <div>
      <h1 className="heading">Anime List</h1>
      {animeList.length > 0 && (
        <div className="main_list">
          {animeList.map((anime) => (
            <div>
              <Link key={anime.id} to={`/anime/${anime.id}`}>
                <Card img={anime.img} title={anime.title} />
              </Link>
              <button
                onClick={() => dispatch(removeFromList({ id: anime.id }))}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      {animeList.length === 0 && (
        <p
          style={{ textAlign: "center", fontSize: "larger", marginTop: "40px" }}
        >
          Nothing's here...
        </p>
      )}
    </div>
  );
}

export default AnimeList;
