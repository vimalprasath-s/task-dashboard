import './TaskCard.css'

export default function TaskCard({ task, onEdit, onDelete }) {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>

      <div className="meta">
        <span className={`status ${task.status}`}>
          {task.status.replace('-', ' ')}
        </span>
        <span>Due: {task.dueDate}</span>
      </div>

      <div className="actions">
        <button onClick={() => onEdit(task)}>Edit</button>
        <button onClick={() => onDelete(task)}>Delete</button>
      </div>
    </div>
  )
}

