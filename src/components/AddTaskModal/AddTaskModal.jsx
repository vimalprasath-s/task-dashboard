/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useTasks } from '../../context/TaskContext'
import './AddTaskModal.css'

export default function AddTaskModal({ task, onClose }) {
  const { dispatch } = useTasks()
  const isEdit = Boolean(task)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('pending')
  const [dueDate, setDueDate] = useState('')

  const today = new Date().toISOString().split('T')[0]

  useEffect(() => {
    if (task) {
      setTitle(task.title || '')
      setDescription(task.description || '')
      setStatus(task.status || 'pending')
      setDueDate(task.dueDate || '')
    }
  }, [task])

  function handleSubmit() {
    if (!title.trim()) {
      toast.error('Title is required')
      return
    }
    if (!dueDate) {
      toast.error('Due date is required')
      return
    }
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const selectedDate = new Date(dueDate)
    if (selectedDate < today) {
      toast.error('Due date cannot be in the past')
      return
    }

    dispatch({
      type: isEdit ? 'UPDATE_TASK' : 'ADD_TASK',
      payload: {
        id: task?.id || crypto.randomUUID(),
        title,
        description,
        status,
        dueDate,
      },
    })

    toast.success(isEdit ? 'Task updated' : 'Task added')
    onClose()
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{isEdit ? 'Edit Task' : 'Add Task'}</h2>

        <label htmlFor="title">
          Title <span className="required">*</span>
        </label>
        <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label htmlFor="status">Status</label>

        <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <label htmlFor="due-date">
          Due Date <span className="required">*</span>
        </label>
        <input
          type="date"
          min={today}
          id="due-date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <div className="actions">
          <button onClick={onClose}>Cancel</button>
          <button className="primary" onClick={handleSubmit}>
            {isEdit ? 'Update' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  )
}
