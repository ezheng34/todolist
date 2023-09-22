import React from "react";
import {Routes, Route} from 'react-router-dom'
import Home from "./pages/Home";
import CreateTodo from "./pages/CreateTodo";
import DeleteTodo from "./pages/DeleteTodo";
import EditTodo from "./pages/EditTodo";
import ShowTodo from "./pages/ShowTodo";

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/toDo/create' element={<CreateTodo />} />
      <Route path='/toDo/details/:id' element={<ShowTodo />} />
      <Route path='/toDo/edit/:id' element={<EditTodo />} />
      <Route path='/toDo/delete/:id' element={<DeleteTodo />} />
    </Routes>
  );
};

export default App