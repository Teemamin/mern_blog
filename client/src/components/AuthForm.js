import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Form as RouterForm, useActionData, redirect,json, useNavigate } from 'react-router-dom';
import axios from 'axios'
import classes from '../styles/AuthForm.module.css'
import { useAppContext } from '../context/appContext';
import { useEffect } from 'react';

const AuthForm = () => {
    const data = useActionData()
    const {user} = useAppContext()
    const navigate = useNavigate()
    // console.log(user,'form')
    // useEffect(()=>{
    //   if(user){
    //     navigate('/')
    //   }
    // },[navigate,user])
    
  return (
    <RouterForm method="post">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        {data && <p>{data}</p>}
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name='email' placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name='password' placeholder="Password" />
      </Form.Group>
      
      <Button type="submit" className={classes.submitbtn}>
        Submit
      </Button>
    </RouterForm>
  )
}

export default AuthForm

export const AuthAction = (appContext) => async ({request})=>{

  const {setCurrentUser} = appContext
  console.log(setCurrentUser)
    const data = await request.formData() 
    const userData = {
        email: data.get('email'),
        password: data.get('password')
    }
    if(!userData.email || !userData.password){
        throw json({message: 'Please provide all values'},{status: 400, statusText: 'Please provide all values'})
    }
    try {
        const {data} = await axios.post('/api/auth/login',userData)
        setCurrentUser(data)
        // console.log(setCurrentUser(data))
        return redirect('/')
        
    } catch (error) {
        return error.response.data.msg
    }

}