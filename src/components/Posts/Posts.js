import { connect } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import { getPosts } from "../../store/Posts/PostsAction";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookReader } from "@fortawesome/free-solid-svg-icons";
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
    <div className="container">
      <div className="titleContainer">
        <h1 className="title">Posts</h1>
      </div>
      <div className="table-container">
        <table className="table">
          <tbody className="table__tbody">
            {getPaginatedPosts()?.map((post, index) => (
              <tr className={"table-row table-row--" + index} key={index}>
                <td className="table-row__td">
                  <span>{post.id}.</span>
                </td>
                <td className="table-row__td">{post?.title}</td>
                <td className="table-row__td td">
                  <button className="button button--primary btn-xl btn--rounded">
                    <Link to={"/Post/" + post?.id}>
                      <FontAwesomeIcon icon={faBookReader} /> Read it!
                    </Link>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="pagination">
        <li
          onClick={goToPreviousPage}
          className="pageNumber"
          style={{ display: currentPage === 1 ? "none" : "block" }}
        >
          <a href="# " className="prev">
            &laquo; Prev
          </a>
        </li>
        {getPaginationGroup().map((item, index) => (
          <li
            key={index}
            onClick={changePage}
            className={`pageNumber${currentPage === item ? " active" : ""}`}
          >
            <a href="# ">{item}</a>
          </li>
        ))}
        <li
          onClick={goToNextPage}
          style={{ display: currentPage === posts?.length / 10 ? "none" : "block" }}
          className="pageNumber"
        >
          <a href="# " className="next">
            Next &raquo;
          </a>
        </li>
      </ul>
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
