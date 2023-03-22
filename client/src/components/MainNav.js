import {NavLink} from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import classes from '../styles/MainNav.module.css'

const MainNav = () => {
  return (
    <>
         <Navbar bg="dark" expand="lg" fixed="top">
          <Container className={classes.list}>
            <NavLink to={'/'} className={({ isActive }) =>
                isActive ? `${classes.active} nav-link` : "nav-link"
              }>
            <Navbar.Brand className={classes['navbar-brand']}>Blog By Susu</Navbar.Brand>
            </NavLink>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavLink to={'/'} className={({ isActive }) =>
                isActive ? `${classes.active} nav-link` : "nav-link"
              }>
                    Home
                </NavLink>
                <NavLink to={'add-post'} className={({ isActive }) =>
                isActive ? `${classes.active} nav-link` : "nav-link"
              }>
                    Add Post
                </NavLink>
                <NavLink to={'profile'} className={({ isActive }) =>
                isActive ? `${classes.active} nav-link` : "nav-link"
              }>
                    Profile
                </NavLink>
                <NavDropdown title="Link" id="navbarScrollingDropdown" className={({ isActive }) =>
                isActive ? `${classes.active} navbar-nav` : "navbar-nav"
              }>
              <NavDropdown.Item href="login">Login</NavDropdown.Item>
              <NavDropdown.Item href="register">
                Register
              </NavDropdown.Item>

              
            </NavDropdown>
              </Nav>
              <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button className={classes.searchBtn}>Search</Button>
          </Form>
            </Navbar.Collapse>
          </Container>
    </Navbar>
    </>
  )
}

export default MainNav