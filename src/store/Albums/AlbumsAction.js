import ApiCaller from "../../services/http";
import * as TYPES from "./AlbumsActionType";

export const getAlbums = () => {
  return function (dispatch) {
    ApiCaller.get("/albums")
      .then((response) => {
        dispatch({
          type: TYPES.FETCH_ALBUMS,
          payload: {
            albums: response.data,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getPhotos = (id) => {
  return function (dispatch) {
    ApiCaller.get("/photos", {
      params: {
        albumId: id,
      },
    })
      .then((response) => {
        dispatch({
          type: TYPES.FETCH_PHOTOS,
          payload: {
            photos: response.data,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
