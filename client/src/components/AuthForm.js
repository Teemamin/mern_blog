import {authFetch} from '../api/axiosDefault'
import Button from './Button';
import Form from 'react-bootstrap/Form';
import { Form as RouterForm, useActionData, redirect,json, useNavigate, useSearchParams, Link } from 'react-router-dom';
import classes from '../styles/AuthForm.module.css'
import { useAppContext } from '../context/appContext';


const AuthForm = () => {
    const data = useActionData()
    const{theme} = useAppContext()
    const navigate = useNavigate()
    const isSubmitting = navigate.state === 'submitting'
    const [searchParam] = useSearchParams()
    const isLogin = searchParam.get('mode') === 'login'
  return (
    <>
      <RouterForm method="post">
        <h1>{isLogin ? 'Login' : 'Register'}</h1>
        {!isLogin && <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name='name' placeholder="Name" />
        </Form.Group>}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          {data && <p>{data}</p>}
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name='email' placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name='password' placeholder="Password" />
        </Form.Group>
        
        <Button type="submit" disabled={isSubmitting} btnText='Submit'/>
          
        <p>{isLogin ? "Not a member yet?" : "Already a member?"}
         <Link to={`?mode=${isLogin ? 'register':'login'}`} className={theme === 'dark' ? `${classes.auth} btn` : `${classes.authLight} btn`}>
          {isLogin ? 'Register' : 'Login'}</Link></p> 
        
      </RouterForm>
    </>
  )
}

export default AuthForm

export const authAction = (appContext) => async ({ request }) => {
  const { setCurrentUser } = appContext;
  const searchParams = new URL(request.url).searchParams
  const mode = searchParams.get('mode') || 'login'
  const data = await request.formData();
  const userData = {
    email: data.get("email"),
    password: data.get("password")
  };
  if(mode !== 'login' && mode !== 'register'){
    throw json(
      {message: 'Unsupported mode!'},
      {status: 422}
    )
  }
  if(mode === 'register'){
    userData.name = data.get("name")
    if (!userData.email || !userData.password || !userData.name) {
      throw json(
        { message: "Please provide all values" },
        { status: 400, statusText: "Please provide all values" }
      );
    }
  }
  if(mode === 'login'){
    if (!userData.email || !userData.password) {
      throw json(
        { message: "Please provide all values" },
        { status: 400, statusText: "Please provide all values" }
      );
    }
}
  try {
    const { data } = await authFetch.post(`/auth/${mode}`, userData);
    setCurrentUser(data);
    return redirect("/");
  } catch (error) {
    return error.response.data.msg;
  }
};