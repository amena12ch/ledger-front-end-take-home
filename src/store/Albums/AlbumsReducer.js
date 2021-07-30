import * as TYPES from "./AlbumsActionType";

const initialState = {
  albums: [],
  photos: [],
};

const AlbumsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.FETCH_ALBUMS:
      return {
        ...state,
        albums: action.payload.albums,
      };
    case TYPES.FETCH_PHOTOS:
      return {
        ...state,
        photos: action.payload.photos,
      };
    default:
      return state;
  }
};

export default AlbumsReducer;
