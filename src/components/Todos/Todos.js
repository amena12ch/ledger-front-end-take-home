import { connect } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import {
  getTodos,
  completeTodo,
  deleteTodo,
} from "../../store/Todos/TodosAction";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Pagination from "react-bootstrap/Pagination";
import { Container } from "react-bootstrap";
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
    <Container>
      <div className="titleContainer">
        <h1 className="title">Todos</h1>
      </div>
      <ListGroup>
        {getPaginatedTodos()?.map((todo, index) => (
          <ListGroup.Item key={index} variant="light" as="div">
            <Row>
              <Col xs={12} md={5}>
                {todo?.title}
              </Col>
              <Col xs={3} md={3}>
                <Badge bg={todo?.completed ? "success" : "warning"}>
                  {todo?.completed ? "Completed" : "Incompleted"}
                </Badge>
              </Col>
              <Col xs={3} md={2}>
                <Button
                  variant={
                    todo?.completed ? "outline-secondary" : "outline-success"
                  }
                  disabled={todo?.completed}
                  onClick={() => completeTodoAction(todo?.id)}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </Button>
              </Col>
              <Col xs={3} md={2}>
                <Button
                  variant="outline-danger"
                  onClick={() => deleteTodoAction(todo?.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Pagination>
        <Pagination.Prev
          onClick={goToPreviousPage}
          className="prev"
          disabled={currentPage === 1}
        />
        {getPaginationGroup().map((item, index) => (
          <Pagination.Item
            key={index}
            onClick={changePage}
            className={`paginationItem ${
              currentPage === item ? "active" : null
            }`}
          >
            <span>{item}</span>
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={goToNextPage}
          className="next"
          disabled={currentPage === todos?.length / 20}
        />
      </Pagination>
    </Container>
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
