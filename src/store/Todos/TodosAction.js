import ApiCaller from "../../services/http";
import * as TYPES from "./TodosActionType";

export const getTodos = () => {
  return function (dispatch) {
    ApiCaller.get("/todos")
      .then((response) => {
        dispatch({
          type: TYPES.FETCH_TODOS,
          payload: {
            todos: response.data,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const completeTodo = (id, data) => {
  return function (dispatch) {
    ApiCaller.put("/todos/" + id, data)
      .then(() => {
        dispatch({
          type: TYPES.COMPLETE_TODOS,
          payload: {
            todosUpdated: data,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const deleteTodo = (id) => {
  return function (dispatch) {
    ApiCaller.delete("/todos/" + id)
      .then(() => {
        dispatch({
          type: TYPES.DELETE_TODO,
          payload: {
            id: id,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
