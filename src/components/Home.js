import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container>
      <Carousel variant="dark">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/ledger-logo.png"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/ledger-logo.png"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/ledger-logo.png"
            alt="Second slide"
          />
        </Carousel.Item>
      </Carousel>
      <CardGroup>
        <Card>
          <Card.Body>
            <Card.Title>Posts</Card.Title>
            <Card.Text>
              Check out here posts and their comments. Feel yourself free to
              comment our posts.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            {" "}
            <Button variant="dark" size="sm" as={Link} to="/Posts">
              Check it!
            </Button>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>Albums</Card.Title>
            <Card.Text>
              Check out here Albums and their list of photos.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <Button variant="dark" size="sm" as={Link} to="/Albums">
              Check it!
            </Button>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>Todos</Card.Title>
            <Card.Text>You can find here the list of todos. </Card.Text>
          </Card.Body>
          <Card.Footer>
            <Button variant="dark" size="sm" as={Link} to="/Todos">
              Check it!
            </Button>
          </Card.Footer>
        </Card>
      </CardGroup>
    </Container>
  );
};

export default Home;
