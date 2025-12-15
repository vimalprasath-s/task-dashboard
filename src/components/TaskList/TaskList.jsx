import TaskCard from '../TaskCard/TaskCard'
import './TaskList.css'

export default function TaskList({ tasks, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return <p className="empty">No tasks found</p>
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  )
}
