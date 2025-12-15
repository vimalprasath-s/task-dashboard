import Tabs from '../components/Tabs/Tabs'
import TaskList from '../components/TaskList/TaskList'
import { useTasks } from '../context/TaskContext'

export default function CompletedTasks() {
  const { state } = useTasks()

  const completedTasks = state.tasks.filter(
    task => task.status === 'completed'
  )

  return (
    <div className="app-container">
      <Tabs />
      <TaskList tasks={completedTasks} />
    </div>
  )
}
