import { connect } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import {
  getTodos,
  completeTodo,
  deleteTodo,
} from "../../store/Todos/TodosAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";
const Todos = ({ getTodos, todos, deleteTodo, completeTodo }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const fetchTodosRef = useRef(() => {
    getTodos();
  });

  useEffect(() => {
    fetchTodosRef.current();
  }, []);
  const completeTodoAction = (id) => {
    const todo = todos.filter((todo) => todo.id === id);
    const todoToDelete = {
      userId: todo[0]?.userId,
      id: todo[0]?.id,
      title: todo[0]?.title,
      completed: true,
    };
    const index = todos.findIndex((item) => item.id === todo[0]?.id);
    todos[index] = todoToDelete;
    completeTodo(id, todos);
    getTodos();
  };
  const deleteTodoAction = (id) => {
    deleteTodo(id);
  };

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

  const getPaginatedTodos = () => {
    const startIndex = currentPage * 20 - 20;
    const endIndex = startIndex + 20;
    return todos.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / 5) * 5;
    return new Array(5).fill().map((_, idx) => start + idx + 1);
  };
  return (
    <div className="container">
      <div className="titleContainer">
        <h1 className="title">Todos</h1>
      </div>
      <div className="table-container">
        <table className="table">
          <tbody className="table__tbody">
            {getPaginatedTodos()?.map((todo, index) => (
              <tr className={"table-row table-row--" + index} key={index}>
                <td className="table-row__td">{todo?.title}</td>
                <td className="table-row__td" data-column="Policy status">
                  <p
                    className={
                      todo?.completed
                        ? "table-row__p-status status--green status"
                        : "table-row__p-status status--yellow status"
                    }
                  >
                    {todo?.completed ? "Completed" : "Incompleted"}
                  </p>
                </td>
                <td className="table-row__td">
                  <button
                    className={
                      todo?.completed
                        ? "button button--secondary btn--sm btn--rounded"
                        : "button button--completed btn--sm btn--rounded"
                    }
                    disabled={todo?.completed}
                    onClick={() => completeTodoAction(todo?.id)}
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </button>
                </td>
                <td className="table-row__td">
                  <button
                    className="button button--delete btn--sm btn--rounded"
                    onClick={() => deleteTodoAction(todo?.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
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
          disabled={currentPage === todos?.length / 20}
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
    todos: state.todos.todos,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTodos: () => dispatch(getTodos()),
    deleteTodo: (id) => dispatch(deleteTodo(id)),
    completeTodo: (id, data) => dispatch(completeTodo(id, data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
