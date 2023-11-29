import { useSelector, useDispatch } from "react-redux";
import { removeFromList } from "../features/lists/animeListSlice";
import List from "../components/lists/List";

function AnimeList() {
    const animeList = useSelector(state => state.list);
    const dispatch = useDispatch();

    return <div>
        <h1>Anime List</h1>
        {animeList.map(anime => (
            <li key={anime.id}>
                {anime.anime}
                <button onClick={() => dispatch(removeFromList({id: anime.id}))}>X</button>
            </li>
        ))}
    </div>
}

export default AnimeList;