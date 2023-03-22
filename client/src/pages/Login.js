import AuthForm from "../components/AuthForm"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppContext } from "../context/appContext"

const Login = () => {
  const {user} = useAppContext()
  const navigate = useNavigate()
   console.log(user,'form')
    useEffect(()=>{
      if(user){
        navigate('/')
      }
    },[navigate,user])
  return (
    <><AuthForm/></>
  )
}

export default Login