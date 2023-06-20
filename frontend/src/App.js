
import Form from "./components/Form";
import Header from "./components/Header";
import ToDoList from "./components/ToDoList";
import axios from "axios";
import {useState,useEffect,useCallback} from 'react';


function App() {
  const base_url='http://localhost:8000/api';
  const [task,setTask] = useState('');
  const [tasksList,setTasksList] = useState([]);

  // handling input changes
  const handleChange = (e) => {
    setTask(e.target.value);
  }

  // creating a task
  const addTask = useCallback (
    async(e) => {
      e.preventDefault();
      try {
        await axios.post(base_url+"/task", {
          task
        });
        setTask("")
      } catch (error) {
       console.log(error); 
      }
    },
    [task]
  );  

  // deleting a task
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${base_url}/task/${id}`);
      const updatedTasks = tasksList.filter((task) => task._id !== id);
      setTasksList(updatedTasks);
    } catch (error) {
      console.log(error);
    }
  };
  
  
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(base_url+'/tasks');
        setTasksList(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchTasks(); 
  },[addTask]);

  return (
    <div className="App">
      <div className="container">
        <div className="app-wrapper">
          <Header />
          <div>
            <Form handleChange={handleChange} addTask={addTask} />
          </div>
          <div>
            <ToDoList tasksList={tasksList} deleteTask={handleDelete} setTasksList={setTasksList} baseUrl={base_url}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;


