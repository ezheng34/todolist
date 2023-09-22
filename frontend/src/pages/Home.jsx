import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8080/toDo")
      .then((response) => {
        setTodos(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3x1 my-8">ToDo List</h1>
        <Link to="/toDo/create">
          <MdOutlineAddBox className="text-sky-800 text-4x1" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border border-slate-600 rounded-md">No</th>
              <th className="border border-slate-600 rounded-md">Title</th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Category
              </th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Text
              </th>
              <th className="border border-slate-600 rounded-md">Operations</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo, index) => (
              <tr key={todo._id} className="h-8">
                <td className="border border-slate-700 rounded-md text-center">
                  {index + 1}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {todo.title}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {todo.category}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {todo.text}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  <div className="flex justify-center gap-x-4">
                    <Link to={`/todos/details/${todo._id}`}>
                      <BsInfoCircle className="text-2x1 text-green-800" />
                    </Link>
                    <Link to={`/todos/edit/${todo._id}`}>
                      <AiOutlineEdit className="text-2x1 text-yellow-600" />
                    </Link>
                    <Link to={`/todos/delete/${todo._id}`}>
                      <MdOutlineDelete className="text-2x1 text-red-600" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
