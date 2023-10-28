import classes from "./Card.module.css";

const Card = (props) => {
  return (
    <div className={classes.container}>
      <figure className={classes.image}>
        <img src={props.img} alt={props.title} />
      </figure>
      <div className={classes.title}>
        <h2>{props.title}</h2>
      </div>
    </div>
  );
};

export default Card;
