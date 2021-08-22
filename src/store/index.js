import { combineReducers } from "redux";
import AlbumsReducer from "./Albums/AlbumsReducer";
import PostsReducer from "./Posts/PostsReducer";
import TodosReducer from "./Todos/TodosReducer";

export default combineReducers({
  albums: AlbumsReducer,
  posts: PostsReducer,
  todos: TodosReducer,
});
