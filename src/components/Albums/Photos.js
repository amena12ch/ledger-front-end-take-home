import { connect } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import { getPhotos } from "../../store/Albums/AlbumsAction";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import { Container } from "react-bootstrap";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Pagination from "react-bootstrap/Pagination";

const Photos = ({ getPhotos, photos, match }) => {
  const [pages] = useState(photos?.length / 10);
  const [currentPage, setCurrentPage] = useState(1);
  const { id } = match?.params;
  const fetchPhotoListRef = useRef(() => {
    getPhotos(id);
  });

  useEffect(() => {
    fetchPhotoListRef.current();
  }, [id]);

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

  const getPaginatedPhotos = () => {
    const startIndex = currentPage * 10 - 10;
    const endIndex = startIndex + 10;
    return photos.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / 5) * 5;
    return new Array(5).fill().map((_, idx) => start + idx + 1);
  };
  return (
    <Container>
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/Albums">Albums</Breadcrumb.Item>
        <Breadcrumb.Item active>Data</Breadcrumb.Item>
      </Breadcrumb>
      <Row className="g-6">
        {getPaginatedPhotos()?.map((photo, index) => (
          <Col
            xs={12}
            md={4}
            key={`${photo?.title}-${index}`}
            style={{ marginBottom: 10 }}
          >
            <Card className="photosCard">
              <Card.Img variant="top" src={photo?.url} />
              <Card.Body>
                <Card.Title>{photo?.title}</Card.Title>
                <Card.Text></Card.Text>
              </Card.Body>
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
    photos: state.albums.photos,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPhotos: (id) => dispatch(getPhotos(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Photos);
