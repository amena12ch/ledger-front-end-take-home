import { connect } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import {
  getPostDetails,
  getComments,
  postComment,
} from "../../store/Posts/PostsAction";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import { Container } from "react-bootstrap";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

const PostDetails = ({
  getPost,
  post,
  match,
  getCommentList,
  comments,
  postComment,
}) => {
  const { id } = match?.params;
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [email, setEmail] = useState("");
  const fetchPostDetailsRef = useRef(() => {
    getPost(id);
    getCommentList(id);
  });

  useEffect(() => {
    fetchPostDetailsRef.current();
  }, [id]);
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };
  const submitAddComment = (e) => {
    e.preventDefault();
    let payload = {
      id: "",
      postId: id,
      email: email,
      name: title,
      body: comment,
    };
    postComment(id, payload);
    setTitle("");
    setEmail("");
    setComment("");
    setShow(false);
  };
  return (
    <div>
      <Container>
        <Breadcrumb>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/Posts">Posts</Breadcrumb.Item>
          <Breadcrumb.Item active>{post?.title}</Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <Card.Title className="postTitle">{post?.title}</Card.Title>
          <Card.Body>
            <Card.Text>{post?.body}</Card.Text>
          </Card.Body>
          <Card.Title className="commentTitle">Comments</Card.Title>
          <Accordion>
            {comments?.map((comment, index) => (
              <Accordion.Item eventKey={index} key={index}>
                <Accordion.Header>{comment?.name} </Accordion.Header>
                <Accordion.Body>
                  <small className="text-muted">{comment?.email}</small>
                  <br />
                  {comment?.body}
                </Accordion.Body>
              </Accordion.Item>
            ))}
            <Accordion.Item eventKey={comments?.length}>
              <div className="d-grid gap-2">
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => setShow(true)}
                >
                  Add new comment
                </Button>
              </div>
            </Accordion.Item>
          </Accordion>
        </Card>
        <Modal
          show={show}
          onHide={() => setShow(false)}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              Comment the post
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={submitAddComment}>
              <Form.Floating className="mb-3">
                <Form.Control
                  id="floatingInputCustom"
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                />
                <label htmlFor="floatingInputCustom">Title</label>
              </Form.Floating>
              <Form.Floating className="mb-3">
                <Form.Control
                  id="floatingInputCustom"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={handleEmailChange}
                />
                <label htmlFor="floatingInputCustom">Email address</label>
              </Form.Floating>
              <Form.Floating className="mb-3">
                <FloatingLabel controlId="floatingTextarea2" label="Comment">
                  <Form.Control
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{ height: "100px" }}
                    value={comment}
                    onChange={handleCommentChange}
                  />
                </FloatingLabel>
              </Form.Floating>
              <Button variant="primary" size="sm" type="submit">
                Add new comment
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    post: state.posts.post,
    comments: state.posts.comments,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPost: (id) => dispatch(getPostDetails(id)),
    getCommentList: (id) => dispatch(getComments(id)),
    postComment: (id, data) => dispatch(postComment(id, data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);
