 const Form = ({handleChange,addTask}) => {
    return (
        <form onSubmit={(e)=>addTask(e)}>
            <input type="text" placeholder="Enter a Task..." className="task-input" onChange={(e) => handleChange(e)}/>
            <button className="button-add" type="submit"><i className="bi bi-plus"></i> Add</button>
        </form>
    );
 }
  
 export default Form;