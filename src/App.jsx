import { useEffect, useState } from 'react'

import Navbar from './componants/Navbar'

import { v4 as uuidv4 } from "uuid";
 // ⇨ 'ab16e731-6cee-424d-81a0-5929e9bdb0cc'


function App() {

  const [todo , setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect( () => {
    try {
    let todos = JSON.parse(localStorage.getItem("todos"));
    if(todos) {
      setTodos(todos); 
    }
  } catch(error) {
    console.log("Found corrupted local storage. Clearing...");
    localStorage.removeItem("todos");
  }
  
   

  }, []);

  const savetolocal = (newTodos) => {
    localStorage.setItem("todos", JSON.stringify(newTodos));
  }


  const handleadd = () => {
    if(todo.trim() === "") return;
    const newTodos = [...todos, {id : uuidv4(),todo, isCompleted:false}];

    setTodos(newTodos);
    setTodo("");

    savetolocal(newTodos);
  }

  const handleEdit = (id) => {
    let targetTodo = todos.find(item => item.id === id);
    setTodo(targetTodo.todo);
   

    let newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);

    savetolocal(newTodos);
    
  }
  const handleDelete = (id) => {
     let newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos); 

    savetolocal(newTodos);
  }

  const handleChange = (e) => {
    setTodo(e.target.value);

  }
  const handlecheckbox = (id) => {
    let newTodos = todos.map(item => {
      if(item.id === id) return {...item, isCompleted:!item.isCompleted};
      return item
    });
    setTodos(newTodos);

    savetolocal(newTodos); 
  } 

  return (
    <>
    <Navbar/>
    <div className="container bg-violet-200 mx-auto my-4 rounded-2xl p-4 min-h-[70vh] w-full md:w-3/4 lg:w-1/2">
      <div className="addtodo mx-auto">
        <h2>Add a todo</h2>
        <div className='flex gap-4'>
        <input onChange={handleChange} value={todo} type="text" className="bg-white outline-none border-2 w-1/2"  />
        <button onClick={handleadd} className='bg-violet-700 hover:bg-violet-950 text-white font-bold mx-4 p-4 rounded-2xl cursor-pointer'>add</button>
        </div>
      </div>
     
        <h1 className='text-2xl font-bold my-4'>Your todos</h1>

        <div className="todos">
          {todos.map(item => {
            return (
          <div key={item.id} className="todo flex flex-col md:flex-row gap-4 w-3/4 flex-nowrap justify-between h-fit bg-violet-100 rounded-2xl m-4 p-4 "> 
            <div className='flex flex-nowrap gap-4 items-center'>
             <input onChange={() => handlecheckbox(item.id)} name={item.id} type="checkbox" checked={item.isCompleted} />
            <div className={item.isCompleted?"line-through text-gray-500 break-all":"break-all" }>{item.todo}</div>
            </div>
           
            <div className="buttons flex gap-3 flex-nowrap items-center w-full md:w-auto justify-end">
              <button onClick={() => handleEdit(item.id)} className='bg-violet-700 hover:bg-violet-950 text-white font-bold mx-2 p-2 md:mx-4 md:p-4 rounded-2xl cursor-pointer'>Edit</button>
              <button onClick={() => handleDelete(item.id)} className='bg-violet-700 hover:bg-violet-950 text-white font-bold mx-2 p-2 md:mx-4 md:p-4 rounded-2xl cursor-pointer' >Delete</button>
            </div>

          </div>
            )
            })}
        </div>
      
    </div>
    
    </>
  )
}

export default App
