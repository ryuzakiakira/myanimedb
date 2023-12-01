import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromMangaList } from "../features/lists/mangaListSlice";
import Card from "../components/UI/Card";

function MangaList() {
    const mangaList = useSelector((state) => state.mangaList.list);
    const dispatch = useDispatch();

    return (
        <div>
      <h1 className="heading">Manga List</h1>
      {mangaList.length > 0 && (
        <div className="main_list">
          {mangaList.map((manga) => (
            <div>
              <Link key={manga.id} to={`/manga/${manga.id}`}>
                <Card img={manga.img} title={manga.title} />
              </Link>
              <button
                onClick={() => dispatch(removeFromMangaList({ id: manga.id }))}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      {mangaList.length === 0 && (
        <p
          style={{ textAlign: "center", fontSize: "larger", marginTop: "40px" }}
        >
          Nothing's here...
        </p>
      )}
    </div>
    )
}

export default MangaList;