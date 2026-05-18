function TaskInput({ str, handleInputChange, handleAddTask }) {
  return (
    <div className="input-section">

      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Enter task"
          value={str}
          onChange={handleInputChange}
        />
      </div>

      <button
        type="button"
        className="btn btn-info add-btn"
        onClick={handleAddTask}
      >
        +
      </button>

    </div>
  );
}

export default TaskInput;