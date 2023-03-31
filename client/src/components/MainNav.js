import {NavLink} from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import classes from '../styles/MainNav.module.css'
import { useAppContext } from '../context/appContext';
const MainNav = () => {
  const {user,toggleTheme,theme,logoutUser} = useAppContext()

  return (
    <>
         <Navbar expand="lg">
          <Container className={classes.list}>
            <NavLink to={'/'} className={({ isActive }) =>
                isActive ? `${classes.active} nav-link` : "nav-link"
              }>
            <Navbar.Brand className={classes['navbar-brand']}>Blog By Susu</Navbar.Brand>
            </NavLink>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className={classes['navbar-toggler']}/>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavLink to={'/'} className={({ isActive }) =>
                isActive ? `${classes.active} nav-link` : "nav-link"
              }>
                    Home
                </NavLink>
              {user &&   <NavLink to={'add-post'} className={({ isActive }) =>
                  isActive ? `${classes.active} nav-link` : "nav-link"
                }>
                      Add Post
                  </NavLink>
                }
               {user &&  <NavLink to={'profile'} className={({ isActive }) =>
                  isActive ? `${classes.active} nav-link` : "nav-link"
                }>
                      Profile
                  </NavLink>
                }
                {user ?<div>
                  <button  className= {`${classes.logoutBtn} nav-link`} onClick={logoutUser}>
                    Logout
                </button> 
                </div>  : <NavLink to={'login?mode=login'} className={({ isActive }) =>
                isActive ? `${classes.active} nav-link` : "nav-link"
              }>
                    Login / Register
                </NavLink>}
                
              </Nav>
              <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button className={theme === 'dark' ? classes.searchBtn : classes.searchBtnLight}>Search</Button>
          </Form>
              <button onClick={toggleTheme} className={theme === 'dark' ? `${classes.searchBtn} ${classes.modeBtn}` : `${classes.searchBtnLight} ${classes.modeBtn}`}> 
              {theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}</button>
            </Navbar.Collapse>
          </Container>
    </Navbar>
    </>
  )
}

export default MainNav