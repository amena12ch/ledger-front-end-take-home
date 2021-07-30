import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Navbar bg="dark" variant="dark" fixed="bottom">
      <Container className="justify-content">
        <Row>
          <Nav>
            <Nav.Link as={Link} to="/Posts">Posts</Nav.Link>
            <Nav.Link as={Link} to="/Albums">Albums</Nav.Link>
            <Nav.Link as={Link} to="/Todos">Todos</Nav.Link>
            <Nav.Link as={Link} to="/">FAQ</Nav.Link>
            <Nav.Link as={Link} to="/">About us</Nav.Link>
          </Nav>
        </Row>
        <Row>
          <small className="text-muted">Copyright @2021</small>
        </Row>
      </Container>
    </Navbar>
  );
};

export default Footer;
