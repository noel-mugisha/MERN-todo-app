import { useState } from "react";
import axios from "axios";

const ToDoList = ({tasksList,deleteTask,setTasksList,baseUrl}) => {

    const [updateTaskId,setUpdateTaskId] = useState('');
    const [updatedTask,setUpdatedTask] = useState('');
    // update form 
    const renderUpdateForm = (task) => {
        return (
            <form onSubmit={(e) => updatingTaskForm(e,task._id)}>
                <input type="text" value={updatedTask} className="task-input" onChange={handleUpdateChanges} />
                <button className="button-add" type="submit">Update</button>
            </form>
        );
    }
    // getting initial input    
    const gettingInitialInput = (id) => {
        const taskToUpdate = tasksList.find(task => task._id === id);
        setUpdatedTask(taskToUpdate.task);
    }
    // handling update changes
    const handleUpdateChanges = (e) => {
        setUpdatedTask(e.target.value);
    }

    const updatingTaskForm= async (e,id) => {
        e.preventDefault();
        try {
            await axios.put(baseUrl+`/task/${id}`, {
                task:updatedTask
            })
            const updatedTasks = tasksList.map((task) => task._id === id ? {...task , task:updatedTask} :task);
            setTasksList(updatedTasks);
            setUpdateTaskId('');
            setUpdatedTask('')
        } catch (error) {
            console.log(error);
        }
    }

    // completed tasks
    const handleCompletedTask = async (id) => {
        try {
          await axios.put(baseUrl + `/task/${id}`, {
            completed: true
          });
          const updatedTasks = tasksList.map((task) =>
            task._id === id ? { ...task, completed: true } : task
          );
          setTasksList(updatedTasks);
        } catch (error) {
          console.log(error);
        }
      };
      


    return (
        <div>
            {tasksList.map((task) => (
                <div className="list-item" key={task._id}>
                    {
                        updateTaskId === task._id ? renderUpdateForm(task): 
                            <>
                                <li className={`${task.completed ? "completed" : "list"}`}>{task.task}</li>
                                {!task.completed && (
                                    <>
                                        <button className="button-complete task-button" onClick={()=>handleCompletedTask(task._id)}><i className="fa fa-check-circle"></i></button>
                                        <button className="button-edit task-button" onClick={() => {setUpdateTaskId(task._id);gettingInitialInput(task._id)}}><i className="fa fa-edit"></i></button>
                                    </>
                                )}
                                <button className="button-delete task-button" onClick={() => {deleteTask(task._id)}}><i className="fa fa-trash"></i></button>
                            </>
                        
                    }
                </div>
            ))}
        </div>
    );
}
 
export default ToDoList;

