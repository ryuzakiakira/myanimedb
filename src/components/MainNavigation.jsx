import { NavLink } from "react-router-dom";

import classes from "./MainNavigation.module.css";

function MainNavigation() {
    const hideNavBar = () => {}

  return (
    <header>
      <nav>
        <div className={classes.left}>
          <img src="../../public/icon.png" alt="anime waifu" height={50} />
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
            <li>
              <NavLink
                to={"browse"}
                className={({ isActive }) =>
                  isActive ? classes.active : "undefined"
                }
              >
                Browse
              </NavLink>
            </li>
          </ul>
        </div>
        <div className={classes.right}>
          <label htmlFor="search">
            <input
              type="search"
              id="search"
              name="search"
              placeholder="Search..."
            />
          </label>
        </div>
        <a href="javascript:void(0);" className={classes.icon} onClick={hideNavBar}>&#9776;</a>
      </nav>
    </header>
  );
}

export default MainNavigation;
