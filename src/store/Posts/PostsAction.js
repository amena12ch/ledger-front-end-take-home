import ApiCaller from "../../services/http";
import * as TYPES from "./PostsActionType";

export const getPosts = () => {
  return function (dispatch) {
    ApiCaller.get("/posts")
      .then((response) => {
        dispatch({
          type: TYPES.FETCH_POSTS,
          payload: {
            posts: response.data,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getPostDetails = (id) => {
  return function (dispatch) {
    ApiCaller.get("/posts/" + id)
      .then((response) => {
        dispatch({
          type: TYPES.FETCH_POST_DETAILS,
          payload: {
            post: response.data,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getComments = (id) => {
  return function (dispatch) {
    ApiCaller.get("/posts/" + id + "/comments")
      .then((response) => {
        dispatch({
          type: TYPES.FETCH_COMMENTS,
          payload: {
            comments: response.data,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const postComment = (id, comment) => {
  return function (dispatch) {
    ApiCaller.post("/posts/" + id + "/comments", comment)
      .then((response) => {
        dispatch({
          type: TYPES.ADD_NEW_COMMENT,
          payload: {
            comment: response.data,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
