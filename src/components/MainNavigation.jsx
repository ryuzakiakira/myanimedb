import classes from "./MainNavigation.module.css";

function MainNavigation() {
  return (
    <header>
      <div className={classes.left}>logo</div>

      <div className={classes.center}>
        <ul>
          <li>Home</li>
          <li>Anime List</li>
          <li>Manga List</li>
          <li>Browse</li>
        </ul>
      </div>

      <div className={classes.right}>search</div>
    </header>
  );
}
 
export default MainNavigation;
