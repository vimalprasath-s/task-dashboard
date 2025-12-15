import { useState } from 'react'
import Tabs from '../components/Tabs/Tabs'
import TaskList from '../components/TaskList/TaskList'
import AddTaskModal from '../components/AddTaskModal/AddTaskModal'
import DeleteConfirm from '../components/DeleteConfirm/DeleteConfirm'
import { useTasks } from '../context/TaskContext'
import SearchFilter from '../components/SearchFilter/SearchFilter'
import Chip from '../components/Chip/Chip'
import './Tasks.css'
import useTaskActions from '../hooks/useTaskActions'

export default function AllTasks() {
  const { state } = useTasks()

  const { editingTask, setEditingTask, deletingTask, setDeletingTask, confirmDelete } =
    useTaskActions()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('none')

  const counts = {
    pending: state.tasks.filter((t) => t.status === 'pending').length,
    inProgress: state.tasks.filter((t) => t.status === 'in-progress').length,
    completed: state.tasks.filter((t) => t.status === 'completed').length,
  }

  const filteredTasks = state.tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchText.toLowerCase())
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter
    return matchesSearch && matchesStatus
  })

  if (sortBy === 'due-asc') {
    filteredTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
  }

  if (sortBy === 'due-desc') {
    filteredTasks.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate))
  }

  return (
    <div className="app-container">
      <h2 className="title">Task Management Dashboard</h2>
      <div className="tab-container" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Tabs />
        <button className="primary" onClick={() => setIsModalOpen(true)}>
          Add Task
        </button>
      </div>
      <Chip counts={counts} />

      <SearchFilter
        searchText={searchText}
        onSearchChange={setSearchText}
        status={statusFilter}
        onStatusChange={setStatusFilter}
        sort={sortBy}
        onSortChange={setSortBy}
      />

      <TaskList
        tasks={filteredTasks}
        onEdit={(task) => setEditingTask(task)}
        onDelete={(task) => setDeletingTask(task)}
      />

      {isModalOpen && <AddTaskModal onClose={() => setIsModalOpen(false)} />}

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
