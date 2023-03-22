import classes from '../styles/Button.module.css'

const Button = ({btnText}) => {
  return (
    <button className={classes.Btn}>{btnText}</button>
  )
}

export default Button