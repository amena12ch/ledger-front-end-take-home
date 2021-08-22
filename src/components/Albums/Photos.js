import { connect } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import { getPhotos } from "../../store/Albums/AlbumsAction";
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
    <div className="container">
      <section>
        <div className="wrap">
          {getPaginatedPhotos()?.map((photo, index) => (
            <div className="box" key={index}>
              <div className="boxInner">
                <img variant="top" src={photo?.url} alt=""/>
                <div className="titleBox">{photo?.title}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <ul className="pagination">
        <li
          onClick={goToPreviousPage}
          className="pageNumber"
          disabled={currentPage === 1}
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
          disabled={currentPage === pages}
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
    photos: state.albums.photos,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPhotos: (id) => dispatch(getPhotos(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Photos);
