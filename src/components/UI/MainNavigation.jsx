import { NavLink, useNavigate } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import { useState } from "react";

function MainNavigation({ fetchedData, searchFn }) {
  const [search, setSearch] = useState('');
  
  const searchInputHandler = (e) => {
    setSearch(e.target.value);
  }

  const searchHandler = (e) => {
    e.preventDefault();
    searchFn(search);
  }
  
  const hideNavBar = () => {}

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
          <form onSubmit={searchHandler}>
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
        </div>
        <a href="#" className={classes.icon} onClick={hideNavBar}>&#9776;</a>
      </nav>
    </header>
  );
}

export default MainNavigation;
