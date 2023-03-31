import classes from '../styles/Button.module.css'
import { useAppContext } from '../context/appContext';

const Button = ({btnText,type,disabled}) => {
  const {theme} = useAppContext()
  return (
    <button type={type} className={theme === 'light' ? classes.BtnLight : classes.Btn} disabled={disabled}>{btnText}</button>
  )
}

export default Button