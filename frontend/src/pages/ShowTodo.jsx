import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowTodo = () => {
  const [todo, setTodo] = useState({});
  const [loading, setLoading] = useState(false);
  const {id} = useParams();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://loaclhost:8080/toDo/${id}`)
      .then((response) => {
          setTodo(response.data);
          setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      })
  }, [])
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3x1 my-4'>Show Todo</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-x1 w-fit p-4'>
          <div className='my-4'>
            <span className='text-x1 mr-4 text-gray-500'>Id</span>
            <span>{todo._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-x1 mr-4 text-gray-500'>Title</span>
            <span>{todo.title}</span>
          </div>
          <div className='my-4'>
            <span className='text-x1 mr-4 text-gray-500'>Category</span>
            <span>{todo.category}</span>
          </div>
          <div className='my-4'>
            <span className='text-x1 mr-4 text-gray-500'>Text</span>
            <span>{todo.text}</span>
          </div>
          <div className='my-4'>
            <span className='text-x1 mr-4 text-gray-500'>Create Time</span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className='my-4'>
            <span className='text-x1 mr-4 text-gray-500'>Update Time</span>
            <span>{new Date(book.UpdatedAt).toString()}</span>
          </div>
        </div>
      )}
      </div>
  )
}

export default ShowTodo