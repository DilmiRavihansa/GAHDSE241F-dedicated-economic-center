import  "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css"; // Import Home CSS file

const NavigationWithVideo = () => {
  return (
    <div className="video-container">
      {/* Background Video */}
      <video className="w-100 background-video" autoPlay  muted>
        <source src="src/assets/backgroundVedeo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Navigation Bar */}
      <Navbar expand="lg" className="navbar">
        <Container fluid>
          <Navbar.Brand href="/" className="navbar-brand">
            My Website
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0 navbar-nav" navbarScroll>
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#service">Service</Nav.Link>
              <NavDropdown title="Category" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action1">Category 1</NavDropdown.Item>
                <NavDropdown.Item href="#action2">Category 2</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action3">Something Else</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button className="btn">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavigationWithVideo;
