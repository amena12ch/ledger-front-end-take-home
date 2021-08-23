import { connect } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import { getAlbums } from "../../store/Albums/AlbumsAction";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhotoVideo } from "@fortawesome/free-solid-svg-icons";
const Albums = ({ getAlbums, albums }) => {
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
    <div className="container">
      <div className="titleContainer">
        <h1 className="title">Albums</h1>
      </div>
      <div className="row">
        {getPaginatedalbums().map((album, index) => (
          <div className="album column is-3" key={`${album?.title}-${index}`}>
            <div className="album-title">
              <Link to={"/Album/" + album?.id}>
                <FontAwesomeIcon icon={faPhotoVideo} />
                {album?.title}
              </Link>
            </div>
          </div>
        ))}
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
          style={{ display: currentPage === albums?.length / 20 ? "none" : "block" }}
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
    albums: state.albums.albums,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAlbums: () => dispatch(getAlbums()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Albums);
