import classes from './LoadingIndicator.module.css'

function LoadingIndicator() {
  return (
    <div className={classes['lds-ring']}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default LoadingIndicator;
