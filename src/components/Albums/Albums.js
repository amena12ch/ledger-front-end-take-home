import { connect } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import { getAlbums } from "../../store/Albums/AlbumsAction";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";

const Albums = ({ getAlbums, albums }) => {
  const [pages] = useState(albums?.length / 20);
  const [currentPage, setCurrentPage] = useState(1);
  const fetchDataRef = useRef(() => {
    getAlbums();
  });
  useEffect(() => {
    fetchDataRef.current();
  }, []);

  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }

  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  const getPaginatedalbums = () => {
    const startIndex = currentPage * 20 - 20;
    const endIndex = startIndex + 20;
    return albums.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / 5) * 5;
    return new Array(5).fill().map((_, idx) => start + idx + 1);
  };
  return (
    <Container>
      <div className="titleContainer">
        <h1 className="title">Albums</h1>
      </div>
      <Row className="g-6">
        {getPaginatedalbums().map((album, index) => (
          <Col
            xs={12}
            md={4}
            key={`${album?.title}-${index}`}
            style={{ marginBottom: 10 }}
          >
            <Card className="albumsCard">
              <Card.Body>
                <Card.Title>{album?.title}</Card.Title>
                <Card.Text></Card.Text>
              </Card.Body>
              <Card.Footer>
                <Button
                  variant="secondary"
                  size="sm"
                  as={Link}
                  to={"/Album/" + album?.id}
                >
                  Photos
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination>
        <Pagination.Prev
          onClick={goToPreviousPage}
          className="prev"
          disabled={currentPage === 1}
        />
        {getPaginationGroup().map((item, index) => (
          <Pagination.Item
            key={index}
            onClick={changePage}
            className={`paginationItem ${
              currentPage === item ? "active" : null
            }`}
          >
            <span>{item}</span>
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={goToNextPage}
          className="next"
          disabled={currentPage === pages}
        />
      </Pagination>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    albums: state.albums.albums,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAlbums: () => dispatch(getAlbums()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Albums);
