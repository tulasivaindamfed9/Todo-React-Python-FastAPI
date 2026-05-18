function CompletedTasks({ completedTask }) {
  return (
    <div className="completed-section">

      <h3>Completed Tasks</h3>

      <ul className="completed-list">
        {completedTask.map((item, index) => (
          <li key={index} className="completed-item">
            {item}
          </li>
        ))}
      </ul>

    </div>
  );
}

export default CompletedTasks;