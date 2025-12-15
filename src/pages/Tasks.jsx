import { useState } from 'react'
import { toast } from 'react-hot-toast'
import Tabs from '../components/Tabs/Tabs'
import TaskList from '../components/TaskList/TaskList'
import AddTaskModal from '../components/AddTaskModal/AddTaskModal'
import DeleteConfirm from '../components/DeleteConfirm/DeleteConfirm'
import { useTasks } from '../context/TaskContext'
import SearchFilter from '../components/SearchFilter/SearchFilter'


export default function AllTasks() {
  const { state, dispatch } = useTasks()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [deletingTask, setDeletingTask] = useState(null)
  const [searchText, setSearchText] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('none')

  function handleDeleteConfirm() {
    dispatch({
      type: 'DELETE_TASK',
      payload: deletingTask.id
    })
    toast.success('Task deleted')
    setDeletingTask(null)
  }

  const filteredTasks = state.tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchText.toLowerCase())
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter
    return matchesSearch && matchesStatus
  })

if (sortBy === 'due-asc') {
  filteredTasks.sort(
    (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
  )
}

if (sortBy === 'due-desc') {
  filteredTasks.sort(
    (a, b) => new Date(b.dueDate) - new Date(a.dueDate)
  )
}

  return (
    <div className="app-container">
      <div className="tab-container" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Tabs />
        <button className='primary' onClick={() => setIsModalOpen(true)}>+ Add Task</button>
      </div>

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
  onEdit={task => setEditingTask(task)}
  onDelete={task => setDeletingTask(task)}
/>

  {isModalOpen && (
    <AddTaskModal onClose={() => setIsModalOpen(false)} />
  )}

  {editingTask && (
    <AddTaskModal
      task={editingTask}
      onClose={() => setEditingTask(null)}
    />
  )}

  {deletingTask && (
    <DeleteConfirm
      taskTitle={deletingTask.title}
      onConfirm={handleDeleteConfirm}
      onCancel={() => setDeletingTask(null)}
    />
  )}
    </div>
  )
}
