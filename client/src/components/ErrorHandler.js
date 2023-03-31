import { useRouteError,Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import img from '../assests/images/notfoundimage.svg'
import classes from '../styles/ErrorHandler.module.css'



const ErrorPage = ()=> {
  const error = useRouteError();
  

  return (
    <Container className={classes.container}>
        <Row>
            <Col>
            <div className={classes.errorDiv}>
                <img src={img} alt='not found'  className={classes.img}/>
                
            </div>
            <h3 className="text-center">{error && error.statusText}</h3>
                <p className={`${classes.error} text-center`}>{error.data && error.data.message}</p>
                <div className={classes.centerLink}>
                    <Link to='/' className="textCenter">back home</Link>
                </div>
                
            </Col>
        </Row>
   
    </Container>
  );
}

export default ErrorPage