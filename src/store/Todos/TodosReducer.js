import * as TYPES from "./TodosActionType";

const initialState = {
  todos: [],
};

const TodosReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.FETCH_TODOS:
      return {
        ...state,
        todos: action.payload.todos,
      };
    case TYPES.COMPLETE_TODOS:
      return {
        ...state,
        todos: action.payload.todosUpdated,
      };
    case TYPES.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    default:
      return state;
  }
};

export default TodosReducer;
