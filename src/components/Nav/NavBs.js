import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import NavDropdown from 'react-bootstrap/NavDropdown'
import '../Home/home.css'
import './Navbar.css'

const NavBs = () => {

    return(
        <Navbar  bg="black" variant='dark' expand="xxl">
            <Navbar.Brand margin-left="2%" href="/"><img className="yt-logo" height="100 px"  src={"https://danger-pop-studio.s3.amazonaws.com/logos/logo+W+Large.png"} alt={"Yardley Tattoo Logo White"}/></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Container>
                    <Nav className="justify-content-end">
                        <NavDropdown title="Artists" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/artists/Hayes">Hayes</NavDropdown.Item>
                            <NavDropdown.Item href="/artists/Mikey">Mikey</NavDropdown.Item>
                            <NavDropdown.Item href="/artists/Max">Max</NavDropdown.Item>
                        </NavDropdown>
                        {/* <Nav.Link href="#">Artists</Nav.Link> */}
                        <Nav.Link href="/studio">Our Space</Nav.Link>
                        <Nav.Link href="/tattoo-requests">Bookings</Nav.Link>
                        <Nav.Link href="/faq">FAQ</Nav.Link>
                        <Nav.Link href="/aftercare">Aftercare</Nav.Link>
                        <Nav.Link href="/sign-in">Sign In</Nav.Link>
                    </Nav>
                </Container>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBs