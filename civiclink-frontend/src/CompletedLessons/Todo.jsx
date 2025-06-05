import React, {useState, useEffect} from "react";
function Todo(){
    const [tasks,setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");



	useEffect(() => {
		fetch("http://localhost:8080/api/todos")
			.then(response => response.json())
			.then(data => setTasks(data))
			.catch(error => console.error("Error fetching tasks:", error));
		},[]);



    function handleInputChange(event){
        setNewTask(event.target.value);
    }
    function addTask(){
        if(newTask.trim() !== ""){ 
        setTasks(t => [...t, newTask]);
        setNewTask("");
        }
    }
    function deleteTask(index){
        const updatedtasks = tasks.filter((_,idx) => idx !== index);
        setTasks(updatedtasks)
    }
    function moveTaskUp(index){
        if(index > 0 ){
            const updatedtasks= [...tasks];
            [updatedtasks[index],updatedtasks[index-1]]=[updatedtasks[index-1],updatedtasks[index]];
            setTasks(updatedtasks)
        }
    }
    function moveTaskDown(index){
        if(index < tasks.length-1){
            const updatedtasks= [...tasks];
            [updatedtasks[index],updatedtasks[index+1]]=[updatedtasks[index+1],updatedtasks[index]];
            setTasks(updatedtasks)
        }
    }

    
    return(
        <div className="todo-list" >
            <h1>ToDo List</h1>

            <div>
                <input
                     type="text"
                     placeholder="Enter a task"
                     value={newTask}
                     onChange={handleInputChange}/>
                <button
                 className="addbutton" 
                 onClick={addTask}
                 >Add
                 </button>
            </div>
            <ol>
                {tasks.map((task, index) => 
                    <li key={index}>
                        <span className="text">{task}</span>
                        <button 
                        className="deletebutton" 
                         onClick={() => deleteTask(index)}
                        >Delete</button>

                        <button
                            className="moveupbutton"
                            onClick={() => moveTaskUp(index)}
                        >MoveUp^</button>

                        <button 
                        className="movedownbutton"
                        onClick={() => moveTaskDown(index)}
                        >MoveDown</button>
                    </li>
                )}
            </ol>
            
        </div>
    );
}
export default Todo