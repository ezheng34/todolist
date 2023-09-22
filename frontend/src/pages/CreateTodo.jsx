import React, {useState} from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateTodo = () => {
    const[title, setTitle] = useState('');
    const[category, setCategory] = useState('');
    const[text, setText] = useState('');
    const[loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSaveTodo = () => {
        const data = {title, category, text,};
        setLoading(true);
        axios
            .post('http://localhost:8080/toDo', data)
            .then(() => {
                setLoading(false);
                navigate('/');
            })
            .catch((error) => {
                setLoading(false);
                alert(`error`);
                console.log(error);
            });
    };
    return (
    <div className='p-4'>
        <BackButton />
        <h1 className='text-3x1 my-4'>Create Todo</h1>
        {loading ? <Spinner /> : ''}
        <div className='flex flex-col border-2 border-sky-400 rounded-x1 w-[600px] p-4 mx-auto'>
            <div className='my-4'>
                <label className='text-x1 mr-4 text-gray-500'>Title</label>
                <input
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='border-2 border-gray-500 px-4 py-2 w-full' />
            </div>
            <div className='my-4'>
                <label className='text-x1 mr-4 text-gray-500'>Category</label>
                <input
                    type='text'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className='border-2 border-gray-500 px-4 py-2 w-full' />
            </div>
            <div className='my-4'>
                <label className='text-x1 mr-4 text-gray-500'>Text</label>
                <input
                    type='text'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className='border-2 border-gray-500 px-4 py-2 w-full' />
            </div>
            <button className='p-2 bg-sky-300 m-8' onClick={handleSaveTodo}>
                Save
            </button>
        </div>
    </div>
  )
}

export default CreateTodo