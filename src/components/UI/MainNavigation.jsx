import { NavLink, useNavigate } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import { useEffect, useState } from "react";

function MainNavigation() {
  const [search, setSearch] = useState("");
  const [fetchedData, setFetchedData] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate();

  const searchInputHandler = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = async () => {
    try {
      const temp1 = await fetch(
        `https://api.jikan.moe/v4/manga?q=${search}&order_by=rank&sort=asc&limit=20`
      );
      const temp2 = await fetch(
        `https://api.jikan.moe/v4/anime?q=${search}&order_by=rank&sort=asc&limit=20`
      );
      const manga = await temp1.json();
      const anime = await temp2.json();
      const searchResults = [...anime.data, ...manga.data];
      setFetchedData(searchResults);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const sendData = () => {
    navigate("/results", { state: { data: fetchedData } });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    getSearch();
    setMenuVisible(false);
  };

  useEffect(() => {
    if (fetchedData) {
      sendData();
    }
  }, [fetchedData]);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
    console.log(menuVisible);
  };

  const searchField = (
    <form onSubmit={submitHandler}>
      <label htmlFor="search">
        <input
          type="search"
          id="search"
          name="search"
          placeholder="Search..."
          value={search}
          onChange={searchInputHandler}
        />
      </label>
    </form>
  );

  return (
    <header>
      <nav>
        <div className={classes.left}>
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive ? classes.active : "undefined"
            }
          >
            <img src="/icon.png" alt="anime waifu" height={50} />
          </NavLink>
        </div>
        <div className={classes.center}>
          <ul>
            <li>
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  isActive ? classes.active : "undefined"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"anime"}
                className={({ isActive }) =>
                  isActive ? classes.active : "undefined"
                }
              >
                Anime
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"manga"}
                className={({ isActive }) =>
                  isActive ? classes.active : "undefined"
                }
              >
                Manga
              </NavLink>
            </li>
          </ul>
        </div>
        <div className={classes.right}>
          <a
            href="#"
            className={`${classes.icon} ${menuVisible ? classes.active : ""}`}
            onClick={toggleMenu}
          >
            &#9776;
          </a>
          <div className={classes.searchField}>{searchField}</div>
        </div>
        {menuVisible && (
          <div className={classes.dropdown}>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/anime">Anime</a>
              </li>
              <li>
                <a href="/manga">Manga</a>
              </li>
              <li>{searchField}</li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}

export default MainNavigation;
