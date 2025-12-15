import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useTasks } from '../context/TaskContext'

export default function useTaskActions() {
  const { dispatch } = useTasks()

  const [editingTask, setEditingTask] = useState(null)
  const [deletingTask, setDeletingTask] = useState(null)

  function confirmDelete() {
    dispatch({
      type: 'DELETE_TASK',
      payload: deletingTask.id,
    })
    toast.success('Task deleted')
    setDeletingTask(null)
  }

  return {
    editingTask,
    setEditingTask,
    deletingTask,
    setDeletingTask,
    confirmDelete,
  }
}
