import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Pagination, Table } from "react-bootstrap";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  // const [pageinate, setPageinate] = useState([]);
  const [page, setPage] = useState(1);

  const getData = async () => {
    try {
      const { data } = await axios(
        "https://jsonplaceholder.typicode.com/todos"
      );

      setTodos(data);
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //   const help = [];
  //   for (let index = 0; index < todos.length / 20; index++) {
  //     help.push(index + 1);
  //   }
  //   setPageinate(help);
  // }, [todos]);

  const pageinate = useMemo(() => {
    const help = [];
    for (let index = 0; index < todos.length / 20; index++) {
      help.push(index + 1);
    }
    return help;
  }, [todos]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [page]);
  return (
    <div className="App">
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>id</th>
            <th>title</th>
            <th>completed</th>
          </tr>
        </thead>
        <tbody>
          {todos.slice((page - 1) * 20, page * 20).map((item, index) => {
            return (
              <tr key={item.id}>
                <td>{index}</td>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.completed.toString()}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Pagination>
        <Pagination.First onClick={() => setPage(1)} />
        <Pagination.Prev
          onClick={() => {
            if (page > 1) {
              setPage((last) => last - 1);
            }
          }}
        />
        {pageinate.map((item, index) => {
          return (
            <Pagination.Item
              key={index}
              active={page === item}
              onClick={() => setPage(item)}
            >
              {item}
            </Pagination.Item>
          );
        })}

        <Pagination.Next
          onClick={() => {
            if (page < pageinate[pageinate.length-1]) {
              {
                setPage((last) => last + 1);
              }
            }
          }}
        />
        <Pagination.Last
          onClick={() => setPage(pageinate[pageinate.length - 1])}
        />
      </Pagination>
    </div>
  );
}
export default App;
