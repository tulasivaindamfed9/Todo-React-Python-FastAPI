import { useState, useEffect } from "react";
import "./App.css";
import 'react-toastify/dist/ReactToastify.css';
import { toast ,ToastContainer} from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import {
  getTasks,
  addTask,
  updateTask,
  completeTask,
  getCompletedTasks,
  deleteTask,
} from "./redux/taskSlice";

import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import CompletedTasks from "./components/CompletedTasks";

function App() {
  const dispatch = useDispatch();

  const { tasks, loading, error,completedTasks } = useSelector(
    (state) => state.tasks
  );

  const [str, setStr] = useState("");
 
  // Fetch tasks when component loads
  useEffect(() => {
    dispatch(getTasks());
     dispatch(getCompletedTasks());
    toast.success("Items fetched successfully")
  }, [dispatch]);

  // Handle input change
  function handleInputChange(e) {
    setStr(e.target.value);
  }

  // Add task
  function handleAddTask() {
    if (str.trim() === "") {
      toast.error("please enter a task to continue")
      return;
    }

    const newTask = {
      // id: Date.now(),
      title: str,
    };

    dispatch(addTask(newTask));
    toast.success("Task added successfully!")

    setStr("");
  }

  // Edit task
  function handleEditTask(index) {
    const editedTask = prompt(
      "Enter the new task",
      tasks[index].title
    );

    if (
      editedTask !== null &&
      editedTask.trim() !== ""
    ) {
      dispatch(
        updateTask({
          id: tasks[index].id,
          title: editedTask,
        })
      );
      toast.success("Item edit successfull")
    }
  }

  // Complete task
 async function handleCompleteTask(id) {

    await dispatch(completeTask(id)).unwrap();

    dispatch(getTasks());

    dispatch(getCompletedTasks());

    toast.success("Task completed!");
}

  // Delete task
  function handleDeleteTask(id) {
    dispatch(deleteTask(id));
    toast.success("Item deleted successfully")
  }

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div className="maindiv">
      <h1 className="heading">List of Items</h1>

      <TaskInput
        str={str}
        handleInputChange={handleInputChange}
        handleAddTask={handleAddTask}
      />

      <TaskList
        task={tasks}
        handleCompleteTask={handleCompleteTask}
        handleEditTask={handleEditTask}
        handleDeleteTask={handleDeleteTask}
      />

      <CompletedTasks completedTask={completedTasks} />

      {/* toast container */}
        <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        // theme="colored"
      />
    </div>
  );
}

export default App;