function TaskList({
  task,
  handleCompleteTask,
  handleEditTask,
  handleDeleteTask,
}) {
  return (
    <div className="task-section">

      <h3>Tasks to Complete</h3>

      <ul className="task-list">
        {task.map((item, index) => (
          <li key={index} className="task-item">

            <span>{item}</span>

            <div className="button-group">

           <button
  type="button"
  className="btn complete-btn"
  onClick={() => handleCompleteTask(index)}
>
  Complete
</button>

<button
  type="button"
  className="btn edit-btn"
  onClick={() => handleEditTask(index)}
>
  Edit
</button>

<button
  type="button"
  className="btn delete-btn"
  onClick={() => handleDeleteTask(item)}
>
  Delete
</button>

            </div>

          </li>
        ))}
      </ul>

    </div>
  );
}

export default TaskList;