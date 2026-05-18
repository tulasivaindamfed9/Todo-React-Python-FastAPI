// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "./assets/vite.svg";
// import heroImg from "./assets/hero.png";
// import "./App.css";

// function App() {
//   const [str, setStr] = useState("");
//   const [task,setTask] = useState([]);
//   const [completedTask, setCompletedTask] = useState([]);

//   function handleInputChange(e) {
//     setStr(e.target.value);
//   }
  
//   function handleAddTask(){
//     if(str.trim() != ""){
//       setTask([...task, str]);
//       setStr("");
//     }
//   }

//   function handleEditTask(index){
//   //  use input field to get the new task name
//     const newTask = prompt("Enter the new task name:", task[index]);
//     if(newTask != null && newTask.trim() != ""){
//       const updatedTasks = [...task];
//       updatedTasks[index] = newTask;
//       setTask(updatedTasks);
//     }
//   }

//   function handleCompleteTask(index){
//      const completed=task[index];
//      setCompletedTask([...completedTask,completed]);
//     //  remove the completed task from the task list
//      const updatedTasks = task.filter((item, i) => i !== index);
//      setTask(updatedTasks);
//   }


//   function handleDeleteTask(taskname){
//     const updatedTasks = task.filter((item)=>item !== taskname);
//     setTask(updatedTasks);
//   }
//   return (
//     <>
//       <div className="maindiv">
//         <h1 className="heading d-flex align-items-top p-3">List of Items</h1>
//         {/* input field */}
//         <div>
//         <div className="input-group ">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Username"
//             aria-label="Username"
//             aria-describedby="addon-wrapping"
//             onChange={(e) => handleInputChange(e)}
//             value={str}
//           />
//         </div>
//         <button type="button" className="btn btn-info"
//         onClick={()=>handleAddTask()}>
//           +
//         </button>
//         </div>

//         {/* showing items entered in input field */}
//         <div className="d-flex flex-column align-items-top p-3">
//           <h3>Tasks to complete</h3>
//           <ul>
//             {task.map((item, index) => (
//               <li key={index}>
//                 {item}
//                 <button type="button" className="btn btn-success" onClick={() => handleCompleteTask(index)}>
//                   Complete
//                 </button>
//                 <button type="button" className="btn btn-warning" onClick={() => handleEditTask(index)}>
//                  Edit
//                 </button>
//                 <button type="button" className="btn btn-danger" onClick={() => handleDeleteTask(item)}>
//                   Delete
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Completed Tasks */}
//         <div className="d-flex flex-column align-items-top p-3">
//           <h2>Completed Tasks</h2>
//           <ul>
//             {completedTask.map((item, index) => (
//               <li key={index}>
//                 {item}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;


import { useState } from "react";
import "./App.css";


import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import CompletedTasks from "./components/CompletedTasks";

function App() {
  const [str, setStr] = useState("");
  const [task, setTask] = useState([]);
  const [completedTask, setCompletedTask] = useState([]);

  function handleInputChange(e) {
    setStr(e.target.value);
  }

  function handleAddTask() {
    if (str.trim() !== "") {
      setTask([...task, str]);
      setStr("");
    }
  }

  function handleEditTask(index) {
    const newTask = prompt("Enter the new task name:", task[index]);

    if (newTask !== null && newTask.trim() !== "") {
      const updatedTasks = [...task];
      updatedTasks[index] = newTask;
      setTask(updatedTasks);
    }
  }

  function handleCompleteTask(index) {
    const completed = task[index];

    setCompletedTask([...completedTask, completed]);

    const updatedTasks = task.filter((item, i) => i !== index);
    setTask(updatedTasks);
  }

  function handleDeleteTask(taskname) {
    const updatedTasks = task.filter((item) => item !== taskname);
    setTask(updatedTasks);
  }

  return (
    <div className="maindiv">
     

         <h1 className="heading">
      List of Items
    </h1>

        <TaskInput
          str={str}
          handleInputChange={handleInputChange}
          handleAddTask={handleAddTask}
        />

        <TaskList
          task={task}
          handleCompleteTask={handleCompleteTask}
          handleEditTask={handleEditTask}
          handleDeleteTask={handleDeleteTask}
        />

        <CompletedTasks completedTask={completedTask} />

      </div>
    
  );
}

export default App;
