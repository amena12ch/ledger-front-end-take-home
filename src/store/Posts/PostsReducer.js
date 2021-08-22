import * as TYPES from "./PostsActionType";

const initialState = {
  posts: [],
  post: {},
  comments: [],
};

const PostsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.FETCH_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
      };
    case TYPES.FETCH_POST_DETAILS:
      return {
        ...state,
        post: action.payload.post,
      };
    case TYPES.FETCH_COMMENTS:
      return {
        ...state,
        comments: action.payload.comments,
      };
    case TYPES.ADD_NEW_COMMENT:
      return {
        ...state,
        comments: state.comments.concat(action.payload.comment),
      };
    default:
      return state;
  }
};

export default PostsReducer;
