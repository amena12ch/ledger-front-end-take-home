import { connect } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import {
  getPostDetails,
  getComments,
  postComment,
} from "../../store/Posts/PostsAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faPlus } from "@fortawesome/free-solid-svg-icons";

const PostDetails = ({
  getPost,
  post,
  match,
  getCommentList,
  comments,
  postComment,
}) => {
  const { id } = match?.params;
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [email, setEmail] = useState("");
  const [active, setActive] = useState("");
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
  };
  return (
    <div className="postDetails">
      <div className="commentBox">
        <div className="post">
          <div className="postBody">
            <img className="image" src="/assets/images/user.jpg" alt="post user" />{" "}
            <div className="postContent">
              <div className="postHeader">
                <h4 className="postTitle">{post?.title}</h4>
              </div>
              <span className="postText">{post?.body}</span>
              <div className="postDesc">
                <span className="desc">
                  <FontAwesomeIcon icon={faComment} />
                  <span>{comments?.length}</span> Comments
                </span>
              </div>
            </div>
          </div>
          <div className={`accordion ${active ? "active" : ""}`}>
            <div className="accordion-title">
              Your Comment
              <span className="desc plus" onClick={() => setActive(!active)}>
                <FontAwesomeIcon icon={faPlus} />
              </span>
            </div>
            <div
              className="accordion-content"
              style={{ display: active ? "block" : "none" }}
            >
              <form onSubmit={submitAddComment} className="createComment">
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={handleTitleChange}
                />
                <input
                  placeholder="E-mail"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                />
                <textarea
                  id="comment"
                  type="text"
                  placeholder="Leave your comment here"
                  value={comment}
                  onChange={handleCommentChange}
                  required
                />
                <button className="button button--primary add-comment-button" type="submit">
                  Post Comment
                </button>
              </form>
            </div>
          </div>
        </div>
        {comments?.map((comment, index) => (
          <div className="comment" key={index}>
            <img
              src="/assets/images/user.jpg"
              className="image commentPic"
              alt="user Pic"
            />
            <div className="commentBody">
              <div className="commentHeader">
                <h5 className="commentTitle">{comment?.name}</h5>
                <span className="commentAuthor">{comment?.email}</span>
              </div>
              <span className="commentContent">{comment?.body}</span>
            </div>
          </div>
        ))}
      </div>
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
