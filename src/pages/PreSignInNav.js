import "../App.css"
import { Navbar, Container, Nav, Button } from 'react-bootstrap'
import logo from '../logo_design_1.png'

function PreSignInNav()
{
    return(
        <Navbar expand="lg" fixed="top" bg="light">
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
                <Nav className="me-auto">
                    <Nav.Link href="pricing">Pricing</Nav.Link>
                </Nav>
                <Nav>
                    <Button variant="primary" size="lg" className="fs-sm d-none d-sm-inline-flex" href="/signin">
                    Sign in
                    </Button>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default PreSignInNav;