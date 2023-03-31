import classes from '../styles/Loading.module.css'

const Loading = ({center}) => {
    return (
    //   <div className={center ? `${classes.loading} ${classes.center}`  : classes.loading}>Loading</div>
    <div className={classes.spinnerContainer}>
        <div className={classes.loadingSpinner}></div>
    </div>
    )
  }


export default Loading