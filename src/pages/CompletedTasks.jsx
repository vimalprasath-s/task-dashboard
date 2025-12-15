import Tabs from '../components/Tabs/Tabs'
import TaskList from '../components/TaskList/TaskList'
import DeleteConfirm from '../components/DeleteConfirm/DeleteConfirm'
import AddTaskModal from '../components/AddTaskModal/AddTaskModal'
import { useTasks } from '../context/TaskContext'
import useTaskActions from '../hooks/useTaskActions'
import { useState } from 'react'
import SearchFilter from '../components/SearchFilter/SearchFilter'

export default function CompletedTasks() {
  const { state } = useTasks()

  const [searchText, setSearchText] = useState('')
  const [sortBy, setSortBy] = useState('none')

  const { editingTask, setEditingTask, deletingTask, setDeletingTask, confirmDelete } =
    useTaskActions()

  // const completedTasks = state.tasks.filter((task) => task.status === 'completed')

  const completedTasksList = state.tasks.filter((task) => task.status === 'completed')
  let completedTasks = completedTasksList.filter((task) =>
    task.title.toLowerCase().includes(searchText.toLowerCase())
  )

  if (sortBy === 'due-asc') {
    completedTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
  }

  if (sortBy === 'due-desc') {
    completedTasks.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate))
  }

  return (
    <div className="app-container">
      <h2 className="title">Task Management Dashboard</h2>
      <Tabs />

      {completedTasksList?.length > 0 && (
        <SearchFilter
          searchText={searchText}
          onSearchChange={setSearchText}
          sort={sortBy}
          onSortChange={setSortBy}
          showStatusFilter={false}
        />
      )}

      <TaskList
        tasks={completedTasks}
        onEdit={(task) => setEditingTask(task)}
        onDelete={(task) => setDeletingTask(task)}
      />

      {editingTask && <AddTaskModal task={editingTask} onClose={() => setEditingTask(null)} />}

      {deletingTask && (
        <DeleteConfirm
          taskTitle={deletingTask.title}
          onConfirm={confirmDelete}
          onCancel={() => setDeletingTask(null)}
        />
      )}
    </div>
  )
}
