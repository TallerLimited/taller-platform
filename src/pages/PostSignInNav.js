import "../App.css"
import { Navbar, Container, Nav } from 'react-bootstrap'
import React from 'react'
import logo from '../logo_design_1.png'

function PostSignInNav()
{
    return(
        <Navbar bg = "light" expand = "lg" fixed = "top">
            <Container>
                <Navbar.Brand href="/">
                <img
                    src={logo}
                    alt="Taller"
                    width="80"
                    height="40"
                    className="d-inline-block align-top"
                />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarNav" />
                <Navbar.Collapse id="navbarNav">
                    <Nav className="me-2 navbar-nav-scroll">
                        <Nav.Link href="dashboard">Dashboard</Nav.Link>
                    </Nav>
                    <Nav className="me-2 navbar-nav-scroll">
                        <Nav.Link href="pricing">Pricing</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default PostSignInNav;