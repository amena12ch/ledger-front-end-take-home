import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <img
            src="/images/logo.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt=""
          />
          Ledger
        </Navbar.Brand>
        <Nav>
          <Nav.Link as={Link} to="/Posts">
            Posts
          </Nav.Link>
          <Nav.Link as={Link} to="/Albums">
            Albums
          </Nav.Link>
          <Nav.Link as={Link} to="/Todos">
            Todos
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
