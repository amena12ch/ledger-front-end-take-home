import { connect } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import { getPosts } from "../../store/Posts/PostsAction";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";

const Posts = ({ getPosts, posts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const fetchPostsRef = useRef(() => {
    getPosts();
  });

  useEffect(() => {
    fetchPostsRef.current();
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

  const getPaginatedPosts = () => {
    const startIndex = currentPage * 10 - 10;
    const endIndex = startIndex + 10;
    return posts.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / 5) * 5;
    return new Array(5).fill().map((_, idx) => start + idx + 1);
  };
  return (
    <div>
      <Container>
        <div className="titleContainer">
          <h1 className="title">Posts</h1>
        </div>
        <Row className="g-6">
          {getPaginatedPosts()?.map((post, index) => (
            <Col xs={12} md={5} key={index} style={{ marginBottom: 10 }}>
              <Card style={{ height: "300px" }}>
                <Card.Header style={{ height: "60px" }}>
                  {post?.title}
                </Card.Header>
                <Card.Body>
                  <Card.Text>{post?.body}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Button
                    variant="secondary"
                    size="sm"
                    as={Link}
                    to={"/Post/" + post?.id}
                  >
                    See more
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
            disabled={currentPage === posts?.length / 10}
          />
        </Pagination>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    posts: state.posts.posts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: () => dispatch(getPosts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
