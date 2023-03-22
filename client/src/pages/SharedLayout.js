import {Outlet} from 'react-router-dom'
import MainNav from '../components/MainNav'
import Container from 'react-bootstrap/Container';
import classes from '../styles/SharedLayout.module.css'


const SharedLayout = () => {
  return (
    <>
    <MainNav/>
    <main className={classes.Main}>
      <Container>
          <Outlet/>
      </Container>
    </main>
    
   </>
  )
}

export default SharedLayout